import React, {useEffect, useState} from 'react';
import LayoutProf from "../layouts/LayoutProf";
import {Link, useParams} from "react-router-dom";
import GameModel from "../models/game.model";
import TeamModel from "../models/team.model";
import TimeGame from "../components/stats/TimeGame";
import RoomGame from "../components/stats/RoomGame";

const GameStats = () => {

	const idGame = useParams();

	const [game, setGame] = useState({});
	const [teams, setTeams] = useState([]);
	const [scores, setScores] = useState([]);

	const [option, setOption] = useState('global');

	const handleOption = (e) => {
		setOption(e.target.value);
	}


	const loadGame = async () => {
		const data = await GameModel.getOne(idGame);
		setGame(data);
	}

	useEffect(() => {
		loadGame();
	}, []);

	const loadScores = async () => {
		const data = await GameModel.getScores(idGame);
		setScores(data);
	}

	useEffect(() => {
		loadScores();
	}, []);

	const loadTeams = async () => {
		const data = await TeamModel.get(idGame);
		setTeams(data);
	}

	useEffect(() => {
		loadTeams()
	}, []);

	return(
		<LayoutProf>
			<main>
				<div>
					<Link to={}>{'<'}</Link>
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
				</div>
			</main>
		</LayoutProf>
	)
}

export default GameStats;