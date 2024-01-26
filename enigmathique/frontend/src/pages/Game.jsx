import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { Scene } from 'components/game/SceneManager';
import { socket, SocketContext } from 'contexts/SocketContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConnectionType, ServerToClient } from '../data/socketMessages';
import { RoomProvider } from '../contexts/RoomContext';
import Timer from 'components/game/enigmas/Timer';
import Rules from 'components/game/Rules';
import Modal, { ModalBody, ModalHeader } from 'components/Modal';
import E from '../assets/img/E.png';
import logoNameNobg from '../assets/img/logo-name-enigmathique-white.png';
import bglogo from '../assets/img/bg_logo.png';
import { FiInfo } from 'react-icons/fi';
import Notification from 'components/Notification';
import toast from 'react-hot-toast';
import { handleLoginError } from 'components/authform/handleError';

const Game = () => {
	// Recupère l'id de session dans l'url
	// A changer, facilement modifiable par l'utilisateur
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true); // Pour savoir si on est en train de charger la scène
	const [isFinished, setIsFinished] = useState(false); // Pour savoir si on a fini la salle
	const [errorModalOpen, setErrorModalOpen] = useState(false); // Pour gérer les erreurs et déconnexion

	const navigate = useNavigate();

	const sessionId = searchParams.get('sessionId');
	const teamId = searchParams.get('teamId');

	// Si l'id de session n'est pas défini, on quitte la page
	if (!sessionId || !teamId) {
		navigate('/');
	}

	// Met à jour l'id de session dans le handshake du socket
	socket.io.opts.query = { sessionId, teamId, connectionType: ConnectionType.Game };

	useEffect(() => {
		socket.on(ServerToClient.Message, (message) => {
			console.log('Message du serveur : ' + message);
		});

		socket.on(ServerToClient.Connection, () => {
			console.log('Connecté au serveur');
		});

		socket.on(ServerToClient.Disconnection, () => {
			console.log('Déconnecté du serveur');
		});

		socket.on(ServerToClient.RoomSolved, () => {
			console.log('Salle résolue');
			setIsFinished(true);
		});

		// Obliger de déclarer la fonction comme ça pour pouvoir enlever uniquement celle là dans le return
		const handleRoomSwitch = () => {
			setIsFinished(false);
		};
		socket.on(ServerToClient.SwitchRoom, handleRoomSwitch);

		
		socket.on(ServerToClient.GameEnded, () => {
			console.log('Partie terminée');
			// TODO: Bouger vers la page de fin de partie quand
			navigate('/');
		});

		socket.on(ServerToClient.Error, (data) => {
			if (data.isFatal) {
				// alert(`Erreur : ${data.message}, isFatal : ${data.isFatal}. Faire quelque chose, rajouter du feedback`);
				// navigate('/');
				setErrorModalOpen(true);
			} else {
				toast.error(data.message);
			}
		});

		return () => {
			socket.off(ServerToClient.Message);
			socket.off(ServerToClient.Connection);
			socket.off(ServerToClient.Disconnection);
			socket.off(ServerToClient.RoomSolved);
			socket.off(ServerToClient.SwitchRoom, handleRoomSwitch); // Retire uniquement cette fonction de l'évent
			socket.off(ServerToClient.GameEnded);
			socket.off(ServerToClient.Error);
		};
	});


	const [isWindowOpen, setIsWindowOpen] = useState(false);
	const toggleWindow = () => {
		setIsWindowOpen(!isWindowOpen);
	};

	const handleRedirection = () => {
		setErrorModalOpen(false);
		navigate('/');
	}

	return (
		<SocketContext.Provider value={socket}>
			<Notification />
			<section className="absolute w-full h-20 border-y-0 top-0 topbar-container z-50">
				<div className="w-11/12">
					<img src={logoNameNobg} alt="logo" style={{ height: '4em', marginLeft: '2em' }} />
				</div>
				<div className="flex flex-row items-center gap-2">
					<img src={E} alt="logo" style={{ height: '4em' }} />
				</div>
			</section>

			{/* Bouton pour ouvrir/fermer la fenêtre */}
			<button className='absolute z-50 bottom-0 right-0 
													flex justify-center items-center m-5
								btn-action-blue'
								onClick={toggleWindow}><FiInfo size='3em'/></button>

			{/* Fenêtre d'aide */}
			{isWindowOpen && (
				<>
					{/* Contenu de la fenêtre */}
					<Rules onCloseClick = {toggleWindow}></Rules>
				</>
			)}

			{/* Loader */}
			{isLoading && (
				<div className='absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center'>
					<div className='flex flex-col justify-center items-center'>
						<h1>Chargement de la salle...</h1>
						<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
					</div>
				</div>
			)}

			{/* Fin de la salle */}
			{/* TODO: Remettre quand fix, empeche de rejouer quand rotation */}
			{(isFinished) && ( 
				<div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-50' style={{background: 'rgba(0, 0, 0, 0.7)',}}>
					
					<img src={bglogo} alt="logo" style={{
						position: 'absolute',
						width: '100vw',
						height: '100vh',
						top: '0',
						left: '0',
						zIndex: '-1',
					}}/>

					<div className='flex flex-col justify-center items-center'>
						<h1 style={{
							fontSize: '3em',
							fontWeight: 'bold',
							color: '#1affff',
						}}>VOUS AVEZ FINI LA SALLE !</h1>
						<p style={{ fontSize: '2em',fontWeight: 'bold',color: '#ffffff',}}>Profitez-en pour prendre une pose, vous l&apos;avez bien mérité.</p>
					</div>
				</div>
			)}

			{/* Chronomètre */}
			{!isLoading && <Timer duration={600}/>}
			{errorModalOpen && (
					<Modal>
						<ModalHeader title="Erreur"/>
						<ModalBody>
							<form className='flex flex-col text-center w-full gap-3'>
								<p className=' block text-sm font-medium mb-5 primary-font-color'> Vous avez été déconnecté de la partie.</p>
								<button
									type='submit'
									className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style'
									onClick={handleRedirection}>
									Accueil
								</button>
							</form>
						</ModalBody>
					</Modal>)}
			<RoomProvider>
				<Canvas
					shadows
					camera={{ position: [5, 5, 5], fov: 35 }}
					style={{ height: '100vh', width: '100vw' }}
				>
					<color attach="background" args={['#24579e']} />
					<Scene setIsLoading={setIsLoading}/>
				</Canvas>
			</RoomProvider>
		</SocketContext.Provider>
	);
};

export default Game;
