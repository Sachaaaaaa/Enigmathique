import React, { useEffect, useState } from 'react';
import LayoutProf from '../layouts/LayoutProf';
import { FaStar, FaRegCircle } from 'react-icons/fa';
import { socket } from 'contexts/SocketContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConnectionType, ServerToClient } from 'data/socketMessages';
import TeamDetails from './TeamDetails';
import ActionButton from 'components/dashboard/ActionButton';
import TableContainer from 'components/dashboard/TableContainer';
import ContentHeader from 'components/dashboard/ContentHeader';
import {getPositionIcon, getPositionStyle, calculateScore} from "../components/stats/RankStyleManager";
import { FiInfo } from 'react-icons/fi';
import { getRowColor } from 'components/ListManager';

function ProfFollowUp() {
	const [currentRound, setCurrentRound] = useState(null);
	const [totalRounds, setTotalRounds] = useState(null);
	const [allData, setAllData] = useState(null);
	const [metaData, setMetaData] = useState(null);


	// Assurez-vous que le token et le sessionId sont présents
	const user = JSON.parse(sessionStorage.getItem('user'));
	const token = user?.token;

	const [searchParams] = useSearchParams();
	const sessionId = searchParams.get('sessionId');

	const [rankings, setRankings] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState(null);
	const [selectedTeamName, setSelectedTeamName] = useState(null);

	const navigate = useNavigate();

	const sumRoomData = (rooms) => {
		let totalSolved = 0;
		let totalGoodAnswer = 0;
		let totalBadAnswer = 0;
		let totalHint = 0;
		let totalScore = 0;

		for (let i = 0; i < rooms.length; i++) {
			const roomData = rooms[i];
			const roomName = roomData.name;
			const roomIsSolved = roomData.isSolved;
			const numResolved = roomData.nbGoodAnswers;
			const numBadAnswer = roomData.nbBadAnswers;
			const numHint = roomData.nbHints;

			const score = calculateScore(numResolved, numBadAnswer, numHint, roomIsSolved);
			
			totalSolved += roomIsSolved ? 1 : 0;
			totalGoodAnswer += numResolved;
			totalBadAnswer += numBadAnswer;
			totalHint = numHint;
			totalScore += score;
		}

		return { totalSolved, totalGoodAnswer, totalBadAnswer, totalHint, totalScore };
	};

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
				data = data.data;
				setMetaData(data.metadata);
				setAllData(data);
				console.log('Progression des équipes', data);
				
				if (data && data.metadata) {
					const { currentRound, totalRounds } = data.metadata;
					setCurrentRound(currentRound);
					setTotalRounds(data.metadata.rooms.length);
				}

				if (data && data.teams && typeof data.teams === 'object') {
					console.log('Données de progression des équipes', data);
					const teamsData = Object.keys(data.teams).map((key) => {
						if (data.teams[key] && data.teams[key].length > 0) {
							const teamData = data.teams[key];
							const { totalSolved, totalGoodAnswer, totalBadAnswer, totalHint, totalScore } = sumRoomData(teamData);
							return {
								id: key,
								teamName: teamData[0].teamName,
								score: totalScore,
								resolved: totalSolved,
								goodAnswer: totalGoodAnswer,
								badAnswer: totalBadAnswer,
								hint: totalHint,
								rooms: teamData
							};
						} else {
							return null;
						}
					}).filter(team => team !== null);

					teamsData.sort((a, b) => b.score - a.score);
					setRankings(teamsData);
				} else {
					console.error('Les données de progression des équipes sont indéfinies ou ne sont pas dans un format attendu.');
					setRankings([]);
				}
			});

			socket.on(ServerToClient.GameEnded, () => {
				// TODO: Modifier façon de mettre id de game dans l'url (à partir de code de partie)
				//navigate(`rankinkg/${ID_DE_LA_GAME}`);
				navigate('/games/');
			});

			socket.connect();

			return () => {
				socket.disconnect();

				socket.off(ServerToClient.Connection);
				socket.off(ServerToClient.Disconnection);
				socket.off(ServerToClient.AllTeamsProgress);
				socket.off(ServerToClient.GameEnded);
			};
		}
	}, [token, sessionId, socket]);


	const handleDetailsClick = (team) => {
		console.log('Détails de l\'équipe', team);
		setSelectedTeam(team);
		setSelectedTeamName(metaData.teams[team.id].name);
	};


	return (
		<LayoutProf title='Classement'>
			<main>
				<ContentHeader title='' link='/games'>			
				</ContentHeader>
				{currentRound !== null && totalRounds !== null && (
					<div className='w-auto min-w-[250px] m-5 mb-0 py-2 bg-white primary-font-color text-center text-lg font-semibold shadow-md rounded-full'> 
					Tour actuel :  <span className='blue-font-color'> {currentRound+1} / {totalRounds}</span> </div>
				)}
				<div className="overflow-x-auto">
					<TableContainer headers={['Position','Équipe', 'Score', 'Énigmes Résolues', 'Action']}>
						{rankings.map((team, index) => (
							<tr key={index} className={getRowColor(index)}>
								<td className="p-5 flex items-center justify-left">
									<div className={`relative ${getPositionStyle(index)}`}>
										{getPositionIcon(index)}
										<span className="absolute inset-0 flex items-center justify-center text-sm">
											{index + 1}
										</span>
									</div>
								</td>
								<td className="td-style">
									{metaData == null ? 'NaN' : metaData.teams[team.id].name}
								</td>
								<td className="td-style">
									{team.score}
								</td>
								<td className="td-style">
									{team.resolved}
								</td>
								<td className="td-style text-right">
									<button
										onClick={() => handleDetailsClick(team)}
										title='Détails'
										className='btn-action-blue'
									> <FiInfo size='1.25em'/>
									</button>
								</td>
							</tr>
						))}

					</TableContainer>
				</div>
				{/* Pagination ou autres contrôles ici */}
			</main>
			{selectedTeam && (
				<TeamDetails
					teamData={selectedTeam}
					teamName={selectedTeamName}
					onClose={() => setSelectedTeam(null)}
				/>
			)}
		</LayoutProf>
	);
}

export default ProfFollowUp;