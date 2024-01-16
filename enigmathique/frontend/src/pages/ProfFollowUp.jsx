import React, { useEffect, useState, useContext } from 'react';
import LayoutProf from '../layouts/LayoutProf';
import { FaStar, FaRegCircle } from 'react-icons/fa';
import { SocketContext, socket } from 'contexts/SocketContext';
import { useSearchParams } from 'react-router-dom';
import { ConnectionType, ServerToClient } from 'data/socketMessages';

function ProfFollowUp() {
	
	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get('sessionId');
	const user = JSON.parse(localStorage.getItem('user'));
	const token = user?.token;
	

	// Assurez-vous que le token et le sessionId sont présents
	if (!token) {
		console.error('Token non trouvé');
		// Gérez l'absence de token ici, par exemple redirigez vers la page de connexion
	}

	if (!sessionId) {
		console.error('Id de session non trouvé');
		// Gérez l'absence de sessionId ici, par exemple affichez un message d'erreur
	}

	const [rankings, setRankings] = useState([]);
	const [gameData, setGameData] = useState(null);

	useEffect(() => {
		if (token && sessionId) {
			socket.io.opts.query = {
				token,
				sessionId,
				connectionType: ConnectionType.Game
			};

			// Écouteur de connexion au serveur
			socket.on(ServerToClient.Connection, () => {
				console.log('Connecté au serveur');
			});

			// Écouteur de déconnexion du serveur
			socket.on(ServerToClient.Disconnection, () => {
				console.log('Déconnecté du serveur');
			});

			// Écouteur de progression de toutes les équipes
			socket.on(ServerToClient.AllTeamsProgress, (data) => {
				console.log(data); // Afficher les données reçues dans la console
				data = data.data;
				if (data && data.teams && typeof data.teams === 'object') {
					const teamsData = Object.keys(data.teams).map((key) => {
					// Assurez-vous qu'il y a des données pour cette équipe
						if (data.teams[key] && data.teams[key].length > 0) {
							const team = data.teams[key][0]; // Prendre le premier élément de chaque clé numérique
							const roomName = team.name;
							const roomIsSolved = team.isSolved;
							const teamNumReSolved = team.numSolved;
							const numBadAnswer = team.numBadAnswers;
							const numHint = team.numHints;

							// Calculez le score en tenant compte de si l'énigme est résolue
							const score = calculateScore(teamNumReSolved, numBadAnswer, numHint, roomIsSolved);


							return {
								id: key, // Utiliser la clé numérique comme identifiant unique de l'équipe
								teamName: roomName,
								score: score,
								resolved: `${teamNumReSolved}/20`,
								roomName: roomName,
								roomIsSolved: roomIsSolved,
								numBadAnswer: numBadAnswer,
								numHint: numHint
							};
						} else {
							return null;
						}
					}).filter(team => team !== null); // Filtrer les équipes non définies

					// Triez les données des équipes par score en ordre décroissant
					teamsData.sort((a, b) => b.score - a.score);
					setRankings(teamsData); // Mettre à jour l'état avec les données triées
				} else {
					console.error('Les données de progression des équipes sont indéfinies ou ne sont pas dans un format attendu.');
					setRankings([]); // Réinitialiser les données de progression des équipes
				}
			});



			socket.connect();

			// Nettoyez les écouteurs socket lorsque le composant est démonté
			return () => {
				socket.off(ServerToClient.Connection);
				socket.off(ServerToClient.Disconnection);
				socket.off(ServerToClient.AllTeamsProgress);
			};
		}
	}, [token, sessionId, socket]);



	// Fonction de calcul du score (vous devrez définir cela en fonction de votre logique de notation)
	// Fonction de calcul du score
	const calculateScore = (numSolved, numBadAnswers, numHints, roomIsSolved) => {
		// Points de base pour les énigmes résolues, les mauvaises réponses et les indices
		let score = numSolved * 100 - numBadAnswers * 20 - numHints * 30;

		// Ajouter 300 points si la salle d'énigme est résolue
		if (roomIsSolved) {
			score += 300;
		}

		return score;
	};

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
								{rankings.map((team, index) => (
									<tr key={team.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-center">
											<div className={`relative ${getPositionStyle(index)}`}>
												{getPositionIcon(index)}
												<span className="absolute inset-0 flex items-center justify-center">
													{index + 1}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
											{team.teamName}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{team.score}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{team.resolved}
										</td>
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