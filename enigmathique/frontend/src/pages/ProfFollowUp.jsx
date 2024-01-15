import React, { useEffect, useState } from 'react';
import LayoutProf from '../layouts/LayoutProf';
import { FaStar, FaRegCircle } from 'react-icons/fa';
import { SocketContext, socket } from 'contexts/SocketContext';
import { useSearchParams } from 'react-router-dom';
import { ServerToClient } from 'data/socketMessages';

function ProfFollowUp() {
	
	// Recupère l'id de session dans l'url
	// A changer, facilement modifiable par l'utilisateur
	const [searchParams, setSearchParams] = useSearchParams();
	const sessionId = searchParams.get('sessionId');
	const teamId = searchParams.get('teamId');

	// Si l'id de session n'est pas défini, on quitte la page
	if (!sessionId || !teamId) {
		window.location.href = '/';
	}

	const [gameData, setGameData] = useState(null);
	const rankings = [];

	socket.io.opts.query = {
		token: JSON.parse(localStorage.getItem('user')).token,
		sessionId: sessionId,

	}; // se connecter avec le prof avec son token

	// se connecter a la session avec un useEffect
	useEffect(() => {

		socket.on(ServerToClient.Connection, () => {
			console.log('Connecté au serveur');
		});

		socket.on(ServerToClient.Disconnection, () => {
			console.log('Déconnecté du serveur');
		});

		socket.connect();

		return () => {
			socket.off(ServerToClient.Message);
			socket.off(ServerToClient.Connection);
			socket.off(ServerToClient.Disconnection);
		};
	});
	/*
	const rankings = [
		{ team: 'Julie Lustret & Jean-Marie Duc de Bourgogne', score: 12550, resolved: '16/20' },
		{ team: 'Équipe Alpha', score: 11000, resolved: '15/20' },
		{ team: 'Les Gagnants', score: 9800, resolved: '14/20' },
		{ team: 'Les nuls', score: 9800, resolved: '14/20' },
		{ team: 'Les nuls', score: 8000, resolved: '14/20' },
		{ team: 'Les nuls', score: 8000, resolved: '14/20' },
		// ... d'autres équipes
	];
	*/

	// Fonction pour obtenir l'icône de la position en fonction du rang
	const getPositionIcon = (index) => {
		switch (index) {
		case 0:
			return <FaStar className="text-3xl text-yellow-400" />;
		case 1:
			return <FaStar className="text-3xl text-gray-500" />;
		case 2:
			return <FaStar className="text-3xl text-orange-600" />;
		default:
			return <FaRegCircle className="text-4xl text-blue-300 stroke-2" />;
		}
	};

	// Fonction pour obtenir le style de la position basé sur le rang
	const getPositionStyle = (index) => {
		const positionStyles = [
			'text-white',
			'text-white',
			'text-white',
		];
		return index < 3 ? positionStyles[index] : 'text-blue-400';
	};

	return (
		<LayoutProf>
			<main className="p-8">
				<h1 className="text-2xl font-bold mb-4">Entraînement Probabilités</h1>
				<div className="flex flex-col">
					<h2 className="text-xl font-semibold mb-4 text-gray-500">Classement</h2>
					<div className="overflow-x-auto mt-4">
						<table className="min-w-full">
							<thead>
								<tr className="text-left">
									<th className="pb-4 text-blue-500">Position</th>
									<th className="pb-4 text-blue-500">Équipe</th>
									<th className="pb-4 text-blue-500">Score</th>
									<th className="pb-4 text-blue-500">Énigmes Résolues</th>
									<th className="pb-4 text-blue-500">Action</th>
								</tr>
							</thead>
							<tbody>
								{rankings.map((item, index) => (
									<tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center">
											<div className={`relative ${getPositionStyle(index)}`}>
												{getPositionIcon(index)}
												<span className="absolute inset-0 flex items-center justify-center">
													{index + 1}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{item.team}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.score}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.resolved}</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<a href="#" className="text-blue-600 hover:text-blue-800">Détails</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* Pagination ou autres contrôles ici */}
				</div>
			</main>
		</LayoutProf>
	);
}

export default ProfFollowUp;
