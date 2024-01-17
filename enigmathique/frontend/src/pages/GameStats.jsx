import React, {useEffect, useState} from 'react';
import LayoutProf from "../layouts/LayoutProf";
import {Link, useParams} from "react-router-dom";
import GameModel from "../models/game.model";

const GameStats = () => {

	const idGame = useParams();

	const [game, setGame] = useState({});
	const [teams, setTeams] = useState([]);

	const loadGame = async () => {
		const data = await GameModel.getOne(idGame);
		setGame(data);
	}

	useEffect(() => {
		loadGame();
	}, []);

	const loadTeams = () => {

	}

	return(
		<LayoutProf>
			<main>
				<div>
					<Link to={}>{'<'}</Link>
					<h2>Statistiques de {game.name}</h2>
				</div>
				<div>

				</div>
			</main>
		</LayoutProf>
	)
}

export default GameStats;