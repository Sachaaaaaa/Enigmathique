import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import GameModel from 'models/game.model';
import TeamModel from 'models/team.model';
import LayoutProf from 'layouts/LayoutProf';
import TeamStats from 'components/stats/TeamStats';
import TableContainer from 'components/dashboard/TableContainer';
import ContentHeader from 'components/dashboard/ContentHeader';
import {calculateScore, loadMembers} from 'components/stats/RankStyleManager';
import TeamRow from 'components/stats/TeamRow';
import useTeams from 'hooks/useTeams';

/**
 * Page du classement d'une partie
 * @returns {React.JSX.Element|null}
 * @constructor
 */
const Ranking = () => {

	const { idGame } = useParams();
	const parsedIdGame = parseInt(idGame);

	const [game, setGame] = useState({});
	const [teams] = useTeams(parsedIdGame);
	const [ranking, setRanking] = useState([]);
	const [scoresForOneTeam, setScoresForOneTeam] = useState([]);
	const [selectedTeam, setSelectedTeam] = useState(null);
	const [isGameFinished, setIsGameFinished] = useState(false);


	const navigate = useNavigate();

	/**
	 * Vérifie si la partie est terminée et redirige vers la page des parties si ce n'est pas le cas
	 * @returns {Promise<void>}
	 */
	const checkIfGameFinished = async () => {
		const games = await GameModel.getAll();
		if (games === undefined) {
			navigate('/games');
			return;
		}
		for (const game of games) {
			if (game.id === parsedIdGame) {
				if (game.state === 2) {
					setIsGameFinished(true);
					return;
				} else {
					navigate('/games');
					return;
				}
			}
		}
		navigate('/games');
	};
	/**
	 * Charge une partie
	 * @returns {Promise<void>}
	 */
	const loadGame = async () => {
		const data = await GameModel.getOne(parsedIdGame);
		setGame(data);
	};
	/**
	 * Calcule le score d'une équipe
	 * @returns {Promise<void>}
	 */
	const getRanking = async () => {
		const teamList = await Promise.all(
			teams.map(async (team) => {
				const scores = await TeamModel.getScores(team.id);
				const calculatedScore = scores.reduce((sum, score) => sum +
						calculateScore(score.nbGoodAnswers, score.nbBadAnswers, score.nbHints, score.isSolved), 0);

				const members = await loadMembers(team.id);

				return {
					id: team.id,
					name: team.name,
					members: members,
					calculatedScore: calculatedScore === 0 ? 0: calculatedScore,
					nbSolved: scores.reduce((sum, score) => sum + score.nbGoodAnswers, 0),
				};
			})
		);
		teamList.sort((a, b) => b.calculatedScore - a.calculatedScore);
		setRanking(teamList);
	};

	/**
	 * useEffect pour charger la partie et son score au chargement de la page
	 */
	useEffect(() => {
		checkIfGameFinished();
		loadGame();
	}, []);
	/**
	 * useEffect pour charger le ranking
	 */
	useEffect(() => {
		if (teams === undefined) {
			return;
		}
		if (teams.length > 0) {
			getRanking();
		}
	}, [teams]);
	/**
	 * Charge les scores d'une équipe
	 * @param idTeam
	 * @returns {Promise<void>}
	 */
	const loadScoresForOneTeam = async (idTeam) => {
		const data = await TeamModel.getScores(idTeam);
		setScoresForOneTeam(data);
	};
	/**
	 * Gère le clic sur le bouton de détails d'une équipe
	 * @param team
	 */
	const handleDetailsClick = (team) => {
		setSelectedTeam(team);
		loadScoresForOneTeam(team.id);
	};
	/**
	 * Si la partie n'est pas terminée, on ne charge pas la page
	 */
	if (!isGameFinished) {
		return null;
	}

	return (
		<LayoutProf title={game.name}>
			<main>
				<ContentHeader title="Classement" link='/games'/>
				<div className="overflow-x-auto">
					<TableContainer headers={['Position','Équipe', 'Score', 'Énigmes Résolues', 'Action']}>
						{ranking.map((team, index) => (
							<TeamRow team={team} key={team.id} index={index} detailsOnClick={() => handleDetailsClick(team)}/>
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
};

export default Ranking;