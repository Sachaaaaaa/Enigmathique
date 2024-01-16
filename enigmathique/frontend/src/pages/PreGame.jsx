import React, { useEffect, useState } from 'react';
import LayoutProf from '../layouts/LayoutProf';
import TeamContainer from '../components/preGame/TeamContainer';
import { SocketContext, socket } from 'contexts/SocketContext';
import { useParams } from 'react-router-dom';
import {
	ClientToServer,
	ConnectionType,
	ServerToClient,
} from 'data/socketMessages';
import AuthService from '../services/auth.service';

const PreGame = () => {
	const [lockedTeams, setLockedTeams] = useState([]);
	const [confirmedTeams, setConfirmedTeams] = useState([]);

	const { sessionId } = useParams();
	const token = AuthService.getToken();

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
			console.log(data);
			setLockedTeams(data.lockedTeams);
			setConfirmedTeams(data.confirmedTeams);
			console.log(lockedTeams);
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

	if (!Array.isArray(lockedTeams) || !Array.isArray(confirmedTeams)) {
		throw new Error('lockedTeams and confirmedTeams must be arrays');
	}

	return (
		<SocketContext.Provider value={socket}>
			<LayoutProf>
				<main className="h-5/6 w-full bg-[#f5f7fa] p-4">
					<section className="h-[80%] flex flex-row justify-evenly items-center">
						<TeamContainer teams={lockedTeams} accepted={false} />
						<TeamContainer teams={confirmedTeams} accepted={true} />
					</section>
					<section className="flex flex-row justify-end items-center h-[10%] w-full">
						<button className="btn-validate" onClick={handleStartGame}>
							Commencer la partie
						</button>
					</section>
				</main>
			</LayoutProf>
		</SocketContext.Provider>
	);
};

export default PreGame;
