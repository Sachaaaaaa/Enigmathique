import React from 'react';
import {Pie} from "react-chartjs-2";
import PropTypes from "prop-types";

const MistakeGame = (props) => {

	const teams = props.teams;
	const game = props.game;
	const scores = props.scores;


	const data = {
		labels : [...Array(scores.length/teams.length).keys()],
		datasets: [
			{
				label: 'succès',
				data: [50]
			}
		]
	};

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<h3>Salles réussies</h3>
			</div>
			<div>
				<Pie data={data}></Pie>
			</div>
		</div>
	);
}

MistakeGame.propTypes = {
	teams: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired,
	game: PropTypes.object.isRequired
}

export default MistakeGame;