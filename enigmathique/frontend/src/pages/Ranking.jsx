import React, {useEffect, useState} from 'react';
import {useParams, Link} from "react-router-dom";
import GameModel from "../models/game.model";
import TeamModel from "../models/team.model";
import LayoutProf from "../layouts/LayoutProf";
import ActionButton from "../components/dashboard/ActionButton";
import TeamStats from "./TeamStats";
import TableContainer from "../components/dashboard/TableContainer";
import ContentHeader from "../components/dashboard/ContentHeader";
import {getPositionStyle, getPositionIcon, calculateScore, loadMembers} from "../components/stats/RankStyleManager";

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



	const getRanking = async () => {
		const teamList = await Promise.all(
			teams.map(async (team) => {
				const scores = await TeamModel.getScores(team.id);
				const calculatedScore = scores.reduce((sum, score) => sum +
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


	return (
		<LayoutProf>
			<main>
				<ContentHeader title={game.name} link='/dashboard'/>
				<div className="overflow-x-auto mt-4">
					<TableContainer headers={['Position','Équipe', 'Score', 'Énigmes Résolues', 'Action']}>

						{ranking.map((team, index) => (
							<tr key={team.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
								<td className="px-6 py-4 flex items-center justify-left">
									<div className={`relative ${getPositionStyle(index)}`}>
										{getPositionIcon(index)}
										<span className="absolute inset-0 flex items-center justify-center">
											{index + 1}
										</span>
									</div>
								</td>
								<td className="td-style">
									{team.name}
								</td>
								<td className="td-style">
									{team.calculatedScore}
								</td>
								<td className="td-style">
									{team.nbSolved}
								</td>
								<td className="td-style text-right">
									<ActionButton
										onClick={() => handleDetailsClick(team)}
										title='Détails'
									>
									</ActionButton>
								</td>
							</tr>
						))}
					</TableContainer>
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