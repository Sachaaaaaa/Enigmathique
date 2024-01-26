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
import Notification from '../components/Notification';
import toast from 'react-hot-toast';
import Modal, {ModalBody, ModalHeader} from 'components/Modal';
import { useNavigate } from 'react-router-dom';

const PreGame = () => {
	const [lockedTeams, setLockedTeams] = useState([]);
	const [confirmedTeams, setConfirmedTeams] = useState([]);
	const [confirmateModalOpen, setConfirmateModalOpen] = useState(false);

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
		setConfirmateModalOpen(true);

	};
	const handleRedirection = () => {
		setConfirmateModalOpen(false);
		socket.emit(ClientToServer.FinishComposition);
	}

	if (!Array.isArray(lockedTeams) || !Array.isArray(confirmedTeams)) {
		throw new Error('lockedTeams and confirmedTeams must be arrays');
	}

	return (
		<SocketContext.Provider value={socket}>
			<LayoutProf title='Validation des équipes'>
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
					{confirmateModalOpen && (
					<Modal>
					<ModalHeader title="Lancer la partie"/>
					<ModalBody>
						<form className='flex flex-col text-center w-full gap-3'>
							<p className=' block text-sm font-medium mb-5 primary-font-color'>Voulez-vous commencer la partie ?</p>
							<button
								type='submit'
								className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style'
								onClick={handleRedirection}>
								Lancer
							</button>
							<button
								className='modal-cancel-button-style'
								onClick={() => setConfirmateModalOpen(false)}>
								Annuler
							</button>
						</form>
						</ModalBody>
					</Modal>)}
				</main>
			</LayoutProf>
		</SocketContext.Provider>
	);
};

export default PreGame;
