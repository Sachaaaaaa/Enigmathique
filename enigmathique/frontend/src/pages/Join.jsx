import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AvailableStudents from 'components/join/AvailableStudents';
import SelectedStudents from 'components/join/SelectedStudents';
import {useNavigate} from "react-router-dom";

import {socket, SocketContext} from 'contexts/SocketContext';
import {useParams} from 'react-router-dom';
import {ClientToServer, ConnectionType, ServerToClient} from 'data/socketMessages';
import Notification from "components/Notification";
import toast from "react-hot-toast";
import {SyncLoader} from "react-spinners";
import AuthHeader from "components/AuthHeader"
import Rules from 'components/game/Rules';
import { FiInfo } from "react-icons/fi";
import Modal, { ModalBody, ModalHeader } from 'components/Modal';


const Join = (props) => {
	//? Faire un hook pour ça ? vu le nombre de useStates
	const [available, setAvailable] = useState([]);
	const [selected, setSelected] = useState([]);
	const [isLocked, setIsLocked] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [maxTeamSize, setMaxTeamSize] = useState(4);
	const navigate = useNavigate();
	// Gestion du cas de code invalide
	const [errorModalOpen, setErrorModalOpen] = useState(false);


	// Recupère l'id de session dans l'url
	// À changer, facilement modifiable par l'utilisateur
	const {sessionId} = useParams();
	// Si l'id de session n'est pas défini, on quitte la page
	if (!sessionId) {
		throw new Error('Il faut spécifier un id de session dans l\'url');
	}

	// Met à jour l'id de session dans le handshake du socket
	socket.io.opts.query = {sessionId, connectionType: ConnectionType.TeamComposition};

	useEffect(() => {

		socket.on(ServerToClient.Connection, () => {
			console.log('Connecté au serveur');
		});

		socket.on(ServerToClient.Disconnection, () => {
			console.log('Déconnecté du serveur');
		});

		socket.on(ServerToClient.GameInfo, (data) => {
			console.log(data);
			setMaxTeamSize(data.maxTeamSize);
		});

		socket.on(ServerToClient.SyncAvailableStudents, (data) => {
			console.log(data);
			setAvailable(data.students);
		});

		socket.on(ServerToClient.SyncTeamStudents, (data) => {
			setIsLocked(data.composition.locked);
			setIsConfirmed(data.composition.confirmed);
			setSelected(data.composition.students);
		});

		socket.on(ServerToClient.Error, (data) => {
			if (data.isFatal) {
				// alert(`Erreur : ${data.message}`);
				// navigate('/');
				setErrorModalOpen(true);
			} else {
				toast.error(data.message);
			}
		});

		socket.on(ServerToClient.CompositionFinished, (data) => {
			// TODO: Modifier façon de mettre session et teamId dans l'url
			const teamId = data.teamId;
			navigate(`/game?sessionId=${sessionId}&teamId=${teamId}`);
		});

		socket.connect();

		return () => {
			socket.disconnect();

			socket.off(ServerToClient.Connection);
			socket.off(ServerToClient.Disconnection);
			socket.off(ServerToClient.SyncAvailableStudents);
			socket.off(ServerToClient.SyncTeamStudents);
			socket.off(ServerToClient.CompositionFinished);
		};
	}, []);
	const [status, setStatus] = useState('');
	useEffect(() => {
		if (isConfirmed) {
			setStatus('Votre équipe est prête, en attente du lancement de la partie');
		} else if (isLocked) {
			setStatus('Votre équipe a été enregistrée, en attente de validation');
		}
	}, [isConfirmed, isLocked]);

	const [teamName, setTeamName] = useState('');
	const handleTeamNameChange = (event) => {
		setTeamName(event.target.value);
	};

	const handleCreateTeam = () => {
		let error = false ;
		if (selected.length === 0) {
			error = true;
			toast.error("Veuillez sélectionner un moins un élève");
		}
		if (teamName === '') {
			error = true;
			toast.error("Veuillez entrer un nom d'équipe");
		}
		if (error) return;
		socket.emit(ClientToServer.LockTeam, {name: teamName});
		//TODO: Faut mettre un loader ici
	};

	const handleRedirection = () => {
		setErrorModalOpen(false);
		navigate('/');
	}

	// Gestion de la fenetre d'aide
	const [isWindowOpen, setIsWindowOpen] = useState(false);
	const toggleWindow = () => {
		setIsWindowOpen(!isWindowOpen);
	};

	return (
			<SocketContext.Provider value={socket}>
				<Notification/>
				<main className='fullscreen-container'>
				<AuthHeader title = "Rejoindre une partie"/>
			<div className='grow flex flex-col justify-center items-center gap-10 h-full p-5 pb-10 overflow-auto '>
				{isLocked ?
						(	<>
								<SyncLoader color='#4c49ed'/>
								<h1 className='text-2xl p-1'>{status}</h1>
											{/* Bouton pour ouvrir/fermer la fenêtre */}
									
								<button className='absolute z-50 bottom-0 right-0 flex justify-center items-center m-5 btn-action-blue'
								onClick={toggleWindow}><FiInfo size='3em'/></button>


								{/* Fenêtre d'aide */}
								{isWindowOpen && (
									<>
										{/* Contenu de la fenêtre */}
										<Rules onCloseClick = {toggleWindow}></Rules>
									</>
								)}
							</>
						)
						:
						(
							<>
								<Notification/>
								
								{/* <div className='w-full min-w-[250px] py-2 bg-white primary-font-color text-center text-lg font-semibold shadow-md rounded-full'> {"Création de l'équipe"}</div> */}
								<button className="pregame-join-button" 
								onClick={handleCreateTeam}>
									Créer mon équipe
								</button>
								<section className='join-container'>
									<AvailableStudents available={available} teamSize={maxTeamSize}/>
									<SelectedStudents selected={selected} handleChange={handleTeamNameChange} teamSize={maxTeamSize}/>
								</section>
							</>
						)}
					</div>
					{errorModalOpen && (
					<Modal>
						<ModalHeader title="Code non valide"/>
						<ModalBody>
							<form className='flex flex-col text-center w-full gap-3'>
								<p className=' block text-sm font-medium mb-5 primary-font-color'> La partie que vous tentez de rejoindre {"n'existe"} pas.</p>
								<button
									type='submit'
									className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style'
									onClick={handleRedirection}>
									Accueil
								</button>
							</form>
						</ModalBody>
					</Modal>)}
				</main>
			</SocketContext.Provider>
	);
};
Join.propTypes = {
	professorName: PropTypes.string,
};
export default Join;