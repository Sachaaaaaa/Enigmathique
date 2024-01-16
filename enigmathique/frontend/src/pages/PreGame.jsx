import React, {useEffect, useState} from "react";
import LayoutProf from "../layouts/LayoutProf";
import {useCreationGameContext} from "../components/contexts/CreationGame.context";
import TeamContainer from "../components/preGame/TeamContainer";
import { socket } from 'contexts/SocketContext';
import { useSearchParams } from 'react-router-dom';
import { ClientToServer,	ConnectionType, ServerToClient } from 'data/socketMessages';

const PreGame = () => {
	const [lockedTeams, setLockedTeams] = useState([]);
	const [confirmedTeams, setConfirmedTeams] = useState([]);
	

	const sessionId = 1;
	const token = 'UGVB';

	// Met à jour l'id de session dans le handshake du socket
	socket.io.opts.query = {
		token,
		sessionId,
		connectionType: ConnectionType.TeamComposition,
	};

	useEffect(() => {
		socket.on(ServerToClient.Connection, () => {
			console.log('Connecté au serveur');
		});

		socket.on(ServerToClient.Disconnection, () => {
			console.log('Déconnecté du serveur');
		});

		socket.on(ServerToClient.SyncTeams, (data) => {
			setLockedTeams(data.lockedTeams);
			setConfirmedTeams(data.confirmedTeams);
		});

		socket.connect();

		return () => {
			socket.off(ServerToClient.Connection);
			socket.off(ServerToClient.Disconnection);
			socket.off(ServerToClient.SyncTeams);
		};

	}, []);

	const handleStartGame = () => {
		alert('La partie va commencer');
	};

	console.log(lockedTeams);
	console.log(confirmedTeams);

	return (
		<LayoutProf>
			<main className="h-5/6 w-full bg-[#f5f7fa] p-4">
				<section className='flex flex-col h-[96%] w-full gap-4'>
					<section className='h-[10%] flex flex-row justify-evenly items-center rounded-full shadow bg-white'>
						<h1 className='font-bold'>Code de connexion : UGVB</h1>
					</section>
					<section className="h-[80%] flex flex-row justify-evenly items-center">
						<TeamContainer teams={lockedTeams} accepted={false}/>
						<TeamContainer teams={confirmedTeams} accepted={true}/>
					</section>
					<section className='flex flex-row justify-end items-center h-[10%] w-full'>
						<button className='btn-validate' onClick={handleStartGame}>Commencer la partie
						</button>
					</section>
				</section>
			</main>
		</LayoutProf>
	);
}

export default PreGame;