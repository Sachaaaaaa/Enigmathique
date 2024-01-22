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
import {useNavigate} from 'react-router-dom';

const PreGame = () => {
	const [lockedTeams, setLockedTeams] = useState([]);
	const [confirmedTeams, setConfirmedTeams] = useState([]);

	const { sessionId } = useParams();
	const token = AuthService.getToken();
	const navigate = useNavigate();

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

		socket.on(ServerToClient.CompositionFinished, () => {
			navigate(`/leaderboard?sessionId=${sessionId}`);
		});

		socket.connect();

		return () => {
			socket.disconnect();

			socket.off(ServerToClient.Connection);
			socket.off(ServerToClient.Disconnection);
			socket.off(ServerToClient.SyncTeams);
			socket.off(ServerToClient.CompositionFinished);
		};
	}, []);

	const handleStartGame = () => {
		socket.emit(ClientToServer.FinishComposition);
	};

	if (!Array.isArray(lockedTeams) || !Array.isArray(confirmedTeams)) {
		throw new Error('lockedTeams and confirmedTeams must be arrays');
	}

	return (
		<SocketContext.Provider value={socket}>
			<LayoutProf>
				<main className='flex flex-col flex-grow gap-3 p-5'>
				<section className="flex justify-end w-full">
						<button className="bg-blue-gradient-color modal-validate-button-style w-fit p-8" onClick={handleStartGame}>
							Commencer la partie
						</button>
					</section>
					<section className="grow flex flex-wrap justify-between items-center gap-5 w-full">
						<TeamContainer teams={lockedTeams} isValidated={false} />
						<TeamContainer teams={confirmedTeams} isValidated={true} />
					</section>
				</main>
			</LayoutProf>
		</SocketContext.Provider>
	);
};

export default PreGame;
