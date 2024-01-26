import React, {useEffect, useState} from 'react';
import LayoutProf from 'layouts/LayoutProf';
import {Link, useParams} from 'react-router-dom';
import GameModel from 'models/game.model';
import TimeGame from 'components/stats/TimeGame';
import RoomGame from 'components/stats/RoomGame';
import SuccesGame from 'components/stats/SuccesGame';
import MistakeGame from 'components/stats/MistakeGame';

/**
 * Page des statistiques d'une partie
 * @returns {Element}
 * @constructor
 */
const GameStats = () => {

	const idGame = useParams();

	const [game, setGame] = useState({});
	const [teams] = useState([]);
	const [scores, setScores] = useState([]);

	const [setOption] = useState('global');

	/**
	 * Permet de changer l'option de filtrage
	 * @param e
	 */
	const handleOption = (e) => {
		setOption(e.target.value);
	};

	/**
	 * Charge une partie
	 * @returns {Promise<void>}
	 */
	const loadGame = async () => {
		const data = await GameModel.getOne(idGame);
		setGame(data);
	};
	
	/**
	 * Charge les scores d'une partie
	 * @returns {Promise<void>}
	 */
	const loadScores = async () => {
		const data = await GameModel.getScores(idGame);
		setScores(data);
	};
	/**
	 * useEffect pour charger la partie et son score au chargement de la page
	 */
	useEffect(() => {
		loadGame();
		loadScores();
	}, []);
	

	return(
		<LayoutProf title={game.name} >
			<main>
				<div>
					<Link to=''>{'<'}</Link>
					<h2>Statistiques de {game.name}</h2>
					<select onChange={handleOption}>
						<option value='global'>Global</option>
						{scores.map((score, index) => (
							<option key={index} value={score.roomName}>{score.roomName}</option>
						))}
					</select>
				</div>
				<div>
					<TimeGame teams={teams} game={game} scores={scores}/>
					<RoomGame teams={teams} game={game} scores={scores}/>
					<SuccesGame teams={teams} game={game} scores={scores}/>
					<MistakeGame teams={teams} game={game} scores={scores}/>
				</div>
			</main>
		</LayoutProf>
	);
};

export default GameStats;