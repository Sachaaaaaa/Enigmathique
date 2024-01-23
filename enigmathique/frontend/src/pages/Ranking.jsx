import React, {useEffect, useState} from 'react';
import {useParams, Link} from "react-router-dom";
import GameModel from "../models/game.model";
import TeamModel from "../models/team.model";
import LayoutProf from "../layouts/LayoutProf";
import {FaRegCircle, FaStar} from "react-icons/fa";
import ActionButton from "../components/dashboard/ActionButton";
import TeamStats from "./TeamStats";

const maxTime = 600;

const Ranking = () => {

	const { idGame } = useParams();
	const parsedIdGame = parseInt(idGame);

	const [game, setGame] = useState({});
	const [teams, setTeams] = useState([]);
	const [ranking, setRanking] = useState([]);
	const [scoresForOneTeam, setScoresForOneTeam] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState(null);



	const loadGame = async () => {
		const data = await GameModel.getOne(parsedIdGame);
		setGame(data);
	};

	const loadTeams = async () => {
		const data = await TeamModel.getTeamFromGame(parsedIdGame);
		setTeams(data);
	};

	const loadMembers = async (idTeam) => {
		return await TeamModel.getStudents(idTeam);
	};

	const calculateScore = (numSolved, numBadAnswers, numHints) => {
		return (
			numSolved * 100 - numBadAnswers * 10 - numHints * 20 + (numSolved > 0 ? 300 : 0)
		);
	};

	const getRanking = async () => {
		const teamList = await Promise.all(
			teams.map(async (team) => {
				const scores = await TeamModel.getScores(team.id);
				const calculatedScore = scores.reduce(
					(sum, score) =>
						sum +
						calculateScore(score.nbGoodAnswers, score.nbBadAnswers, score.nbHints),
					0);

				const members = await loadMembers(team.id);

				return {
					id: team.id,
					name: team.name,
					members: members,
					calculatedScore: calculatedScore,
					nbSolved: scores.reduce((sum, score) => sum + score.nbGoodAnswers, 0),
				};
			})
		);
		teamList.sort((a, b) => b.calculatedScore - a.calculatedScore);
		setRanking(teamList);
	};

	useEffect(() => {
		loadGame();
		loadTeams();
	}, []);

	useEffect(() => {
		if (teams.length > 0) {
			getRanking();
		}
	}, [teams]);
	const loadScoresForOneTeam = async (idTeam) => {
		const data = await TeamModel.getScores(idTeam);
		setScoresForOneTeam(data);
	}

	const handleDetailsClick = (team) => {
		console.log("team", team);
		setSelectedTeam(team);
		loadScoresForOneTeam(team.id);
	};
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
				<h1 className="text-2xl font-bold mb-4">{game.name}</h1>
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
						{ranking.map((team, index) => (
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
									{team.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{team.calculatedScore}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{team.nbSolved}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
									<ActionButton
										onClick={() => handleDetailsClick(team)}
										title='Détails'
									>
									</ActionButton>
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</main>
			{selectedTeam && (
				<TeamStats
					teamData={selectedTeam}
					scores={scoresForOneTeam}
					onClose={() => setSelectedTeam(null)}
				/>
			)}
		</LayoutProf>

	);
}

export default Ranking;