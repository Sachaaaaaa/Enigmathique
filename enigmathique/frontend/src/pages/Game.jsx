import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { Scene } from '../components/game/SceneManager';
import { socket, SocketContext } from 'contexts/SocketContext';
import { useSearchParams } from 'react-router-dom';
import { ConnectionType, ServerToClient } from '../data/socketMessages';
import { RoomProvider } from '../contexts/RoomContext';
import Chronometer from '../components/game/enigmas/Chronometre';
import Rules from 'components/game/Rules';

import E from '../assets/img/E.png';
import help from '../assets/img/help.png';
import logoNameNobg from '../assets/img/logo-name-nobg.png';

import { IoIosCloseCircle } from 'react-icons/io';
import { clear } from '@testing-library/user-event/dist/clear';

const Game = () => {
	// Recupère l'id de session dans l'url
	// A changer, facilement modifiable par l'utilisateur
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true); // Pour savoir si on est en train de charger la scène
	const sessionId = searchParams.get('sessionId');
	const teamId = searchParams.get('teamId');

	// Si l'id de session n'est pas défini, on quitte la page
	if (!sessionId || !teamId) {
		window.location.href = '/';
	}

	// Met à jour l'id de session dans le handshake du socket
	socket.io.opts.query = { sessionId, teamId, connectionType: ConnectionType.Game };

	useEffect(() => {
		socket.on(ServerToClient.Message, (message) => {
			console.log('Message du serveur : ' + message);
			setIsLoading(false);
		});

		socket.on(ServerToClient.Connection, () => {
			console.log('Connecté au serveur');
		});

		socket.on(ServerToClient.Disconnection, () => {
			console.log('Déconnecté du serveur');
		});

		return () => {
			socket.off(ServerToClient.Message);
			socket.off(ServerToClient.Connection);
			socket.off(ServerToClient.Disconnection);
		};
	});


	const [isWindowOpen, setIsWindowOpen] = useState(false);
	const toggleWindow = () => {
		setIsWindowOpen(!isWindowOpen);
	};


	return (
		<SocketContext.Provider value={socket}>
			<section className="absolute w-full h-20 border-y-0 top-0 topbar-container z-50">
				<div className="w-11/12">
					<img src={logoNameNobg} alt="logo" style={{ height: '4em' , marginLeft: '2em'}} />
				</div>
				<div className="flex flex-row items-center gap-2">
					<img src={E} alt="logo" style={{ height: '4em' }} />
				</div>
			</section>

			{/* Bouton pour ouvrir/fermer la fenêtre */}
			<div className='absolute bottom-0 right-0 m-4 w-16 h-16 z-50'>
				<button onClick={toggleWindow}><img src={help} alt="help" /></button>
			</div>

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

			{isLoading && <Chronometer initialTime={600} />}
			<RoomProvider>
				<Canvas
					shadows
					camera={{ position: [5, 5, 5], fov: 35 }}
					style={{ height: '100vh', width: '100vw' }}
				>
					<color attach="background" args={['#9999e6']} />
					<Scene />
				</Canvas>
			</RoomProvider>
		</SocketContext.Provider>
	);
};

export default Game;
