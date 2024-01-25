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
import Notification from '../components/Notification';
import toast from 'react-hot-toast';

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
			setLockedTeams(data.lockedTeams);
			setConfirmedTeams(data.confirmedTeams);
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
		if (confirmedTeams.length === 0) {
			toast.error('Il faut au moins une équipe pour commencer la partie');
			return;
		}
		socket.emit(ClientToServer.FinishComposition);
	};

	if (!Array.isArray(lockedTeams) || !Array.isArray(confirmedTeams)) {
		throw new Error('lockedTeams and confirmedTeams must be arrays');
	}

	return (
		<SocketContext.Provider value={socket}>
			<LayoutProf>
				<main className='flex flex-col gap-4 p-5'>
					<Notification/>
					<div className='w-full min-w-[250px] py-2 bg-white primary-font-color text-center text-lg 
								font-semibold shadow-md rounded-full'> 
					Code de connexion : <span className='blue-font-color'>{sessionId}</span> </div>
					<button className="pregame-join-button" onClick={handleStartGame}>
						Commencer la partie
					</button>
					<section className="pregame-container">
						<TeamContainer teams={lockedTeams} isValidated={false} />
						<TeamContainer teams={confirmedTeams} isValidated={true} />
					</section>
				</main>
			</LayoutProf>
		</SocketContext.Provider>
	);
};

export default PreGame;
