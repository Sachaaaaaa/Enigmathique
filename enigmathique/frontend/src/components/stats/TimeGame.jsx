import React from "react";
import {Bar} from "react-chartjs-2";
import PropTypes from "prop-types";

const TimeGame = (props) => {

	const teams = props.teams;
	const scores = props.scores;

	const data = {
		labels : ['oui'],
		datasets: [
			{
				label: 'oui',
				data: [50]
			}
		]
	};

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<h3>Temps réalisé</h3>
			</div>
			<div>
				<Bar data={data}></Bar>
			</div>
		</div>
	)
}

TimeGame.propTypes = {
	teams: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired
}

export default TimeGame;