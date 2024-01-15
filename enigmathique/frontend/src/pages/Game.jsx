import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

import { Scene } from '../components/game/SceneManager';
import { socket, SocketContext } from 'contexts/SocketContext';
import { useSearchParams } from 'react-router-dom';
import { ServerToClient } from '../data/socketMessages';
import { RoomProvider } from '../contexts/RoomContext';

const Game = () => {
	// Recupère l'id de session dans l'url
	// A changer, facilement modifiable par l'utilisateur
	const [searchParams, setSearchParams] = useSearchParams();
	const sessionId = searchParams.get('sessionId');
	const teamId = searchParams.get('teamId');

	// Si l'id de session n'est pas défini, on quitte la page
	if (!sessionId || !teamId) {
		window.location.href = '/';
	}

	// Met à jour l'id de session dans le handshake du socket
	socket.io.opts.query = { sessionId, teamId };

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
			<section className="topbar-container">
				<div className="w-11/12">
					<h1 className="text-3xl">Enigmathique</h1>
				</div>
				<div className="flex flex-row items-center gap-2">
					<img src="../assets/img/E.png" alt="logo" />
				</div>
			</section>

			{/* Bouton pour ouvrir/fermer la fenêtre */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					right: 0,
					margin: '16px',
					borderRadius: '40%',
					padding: '8px',
					background: '#ffd11a',
					zIndex: 999,
				}}
			>
				<button onClick={toggleWindow}>Aide</button>
			</div>

			{/* Fenêtre (à personnaliser en fonction de votre contenu) */}
			{isWindowOpen && (
				<div
					style={{
						position: 'absolute',
						bottom: 0,
						right: 0,
						padding: '16px',
						background: 'white',
						boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
						zIndex: 999,
					}}
				>
					{/* Contenu de la fenêtre */}
					<h2>Aide</h2>
					<p>Vous pouvez vous déplacer dans la salle avec clic gauche, faire tourner la salle avec clic droit.
            et zoomer avec la molette. Passer votre souris sur tous les éléments de la scène pour voir les quelques sont interactifs.
            Les éléments avec lesquels vous pouvez interagir change de couleur.
            Vous pouvez aussi cliquer sur les éléments interactifs pour afficher les énigmes et rentré votre réponse.
            Certain éléments ne donnent pas d&apos;énigmes mais des informations sur des éléments de réponse.
					</p>
					<button onClick={toggleWindow} style={{
						background: '#ff6666',
						padding: '8px',
						borderRadius: '8px',
						width: '12vw'
					}}>Fermer la fenêtre</button>
				</div>
			)}

			<RoomProvider>
				<Canvas
					shadows
					camera={{ position: [8, 8, 8], fov: 35 }}
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
