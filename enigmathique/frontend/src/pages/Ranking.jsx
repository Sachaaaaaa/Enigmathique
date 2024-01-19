import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import GameModel from "../models/game.model";
import TeamModel from "../models/team.model";
import TeamService from "../services/team.service";
import TeamDetails from "./TeamDetails";
import LayoutProf from "../layouts/LayoutProf";
import {FaRegCircle, FaStar} from "react-icons/fa";
import gameTeam from "../components/stats/GameTeam";

const maxTime = 600;

const Ranking = () => {

	const idGame = useParams();

	const [game, setGame] = useState({});
	const [teams, setTeams] = useState([]);
	const [ranking, setRanking] = useState([]);

	const loadGame = async () => {
		const data = await GameModel.getOne(idGame);
		setGame(data);
	}

	const loadTeams = async () => {
		const data = await TeamModel.getTeamFromGame(idGame);
		setTeams(data);
	}

	const loadScore = async (idTeam) => {
		return await TeamModel.getScores(idTeam);
	}

	const loadMembers = async (idTeam) => {
		return await TeamModel.getStudents(idTeam);
	}

	const getRanking = (teamList) => {
		const scoreList = teamList.map(async (team) => {
			const scores = loadScore(team.id);
			const calculatedScore = scores.reduce((sum, score) => sum + (score.time < maxTime ? 500 : 0)+(score.nbGoodAnswers*100)-(score.nbHints*20)-(score.nbBadAnswers*10));
			const members = loadMembers(team.id);
			return {
				id: team.id,
				name: team.name,
				members: members,
				calculatedScore: calculatedScore,
				nbSolved: scores.reduce((sum, score) => sum + (score.nbGoodAnswers))
			};
		}).filter(team => team !== null);

		scoreList.sort((a, b) => b.calculatedScore - a.calculatedScore);
		setRanking(scoreList);
	}

	useEffect(() => {
		loadGame();
		loadTeams();
		getRanking(teams);
	}, []);

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
									{game.state === 2 ?
										<Link to='./TeamStats' className="text-blue-600 hover:text-blue-800">Détails</Link> :
										<span className="text-blue-600 hover:text-blue-800">Détails</span>
									}
								</td>
							</tr>
						))}
						</tbody>
					</table>
				</div>
			</main>
		</LayoutProf>
	);
}

export default Ranking;