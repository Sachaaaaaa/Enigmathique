import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import AvailableStudents from '../components/join/AvailableStudents';
import SelectedStudents from '../components/join/SelectedStudents';
import {useNavigate} from "react-router-dom";

import {socket, SocketContext} from 'contexts/SocketContext';
import {useParams} from 'react-router-dom';
import {ClientToServer, ConnectionType, ServerToClient} from 'data/socketMessages';
import LayoutStudent from "../layouts/LayoutStudent";

const Join = (props) => {
	//? Faire un hook pour ça ? vu le nombre de useStates
	const [available, setAvailable] = useState([]);
	const [selected, setSelected] = useState([]);
	const [isLocked, setIsLocked] = useState(false);
	const [isConfirmed, setIsConfirmed] = useState(false);
	const [maxTeamSize, setMaxTeamSize] = useState(4);
	const navigate = useNavigate();


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

	const [teamName, setTeamName] = useState('');
	const handleTeamNameChange = (event) => {
		setTeamName(event.target.value);
	};

	const handleCreateTeam = () => {
		if (teamName === '') {
			alert('Veuillez entrer un nom d\'équipe');
			return;
		}
		socket.emit(ClientToServer.LockTeam, {name: teamName});
		//TODO: Faut mettre un loader ici
	};

	return (
		<LayoutStudent>
			<SocketContext.Provider value={socket}>
				<main className='flex flex-col h-full w-full p-4 bg-[#f5f7fa]'>
					<h1 className='text-2xl'>Création de l&apos;équipe</h1>
					<section className='flex flex-row justify-evenly gap-2 p-4 h-[70%] w-full'>
						<AvailableStudents available={available} teamSize={maxTeamSize}/>
						<SelectedStudents selected={selected} handleChange={handleTeamNameChange} teamSize={maxTeamSize}/>
					</section>
					<section className='flex flex-row justify-end p-4 h-[10%] w-full'>
						<button className='p-2 bg-blue-800 rounded-xl text-white' onClick={handleCreateTeam}>Créer mon
							équipe
						</button>
					</section>
				</main>
			</SocketContext.Provider>
		</LayoutStudent>
	);
};
Join.propTypes = {
	professorName: PropTypes.string,
};
export default Join;