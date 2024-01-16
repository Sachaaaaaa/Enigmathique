import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/img/logo-name-enigmathique.png';
import AvailableStudents from '../components/join/AvailableStudents';
import SelectedStudents from '../components/join/SelectedStudents';



import { socket , SocketContext} from 'contexts/SocketContext';
import { useParams } from 'react-router-dom';
import { ClientToServer, ConnectionType, ServerToClient } from 'data/socketMessages';

const Join = (props) => {
	const [available, setAvailable] = useState([]);
	const [selected, setSelected] = useState([]);

	console.log(selected);

	// Recupère l'id de session dans l'url
	// A changer, facilement modifiable par l'utilisateur
	const { sessionId } = useParams();
	// Si l'id de session n'est pas défini, on quitte la page
	if (!sessionId) {
		throw new Error('Il faut spécifier un id de session dans l\'url');
	}

	// Met à jour l'id de session dans le handshake du socket
	socket.io.opts.query = { sessionId, connectionType: ConnectionType.TeamComposition };

	useEffect(() => {

		socket.on(ServerToClient.Connection, () => {
			console.log('Connecté au serveur');
		});

		socket.on(ServerToClient.Disconnection, () => {
			console.log('Déconnecté du serveur');
		});

		socket.on(ServerToClient.SyncAvailableStudents, (data) => {
			setAvailable(data.students);
		});

		socket.on(ServerToClient.SyncTeamStudents, (data) => {
			setSelected(data.composition.students);
		});

		socket.connect();

		return () => {
			socket.off(ServerToClient.Connection);
			socket.off(ServerToClient.Disconnection);
			socket.off(ServerToClient.SyncAvailableStudents);
			socket.off(ServerToClient.SyncTeamStudents);
		};
	});

	const handleCreateTeam = () => {
		if (document.getElementById('teamName').value === '') {
			alert('Vous devez donner un nom à votre équipe');
			return;
		}

		const name = document.getElementById('teamName').value;

		socket.emit(ClientToServer.LockTeam, {name});
	};

	return (
		<SocketContext.Provider value={socket}>
			<header className='flex flex-row items-center p-5'>
				<img
					className='h-24 w-24 rounded-full'
					src={logo}
					alt='Logo Enigmatique'/>
				<h1 className='text-3xl text-blue-800'>Rejoindre la partie de <span
					className='text-red-600'>{props.professorName}</span></h1>
			</header>
			<main className='flex flex-col m-5'>
				<section>
					{/*Les divs progressions*/}
				</section>
				<h1 className='text-2xl'>Création de l&apos;équipe</h1>
				<section className='flex flex-row justify-center'>
					<div>
						<label htmlFor='teamName'>Nom de l&apos;équipe</label>
						<input
							className='border-2 border-blue-800 rounded-xl w-full p-2'
							type='text'
							id='teamName'
							placeholder='Nom de l&apos;équipe'
						/>
					</div>
				</section>

				<section className='flex flex-row justify-evenly gap-2 p-4 w-full'>
					<AvailableStudents available={available} teamSize={4}/>
					<SelectedStudents selected={selected} teamSize={4}/>
				</section>
				<section className='flex flex-row justify-end p-4 w-full'>
					<button className='p-2 bg-blue-800 rounded-xl text-white' onClick={handleCreateTeam}>Créer mon équipe
					</button>
				</section>
			</main>
		</SocketContext.Provider>
	);
};
Join.propTypes = {
	professorName: PropTypes.string,
};
export default Join;