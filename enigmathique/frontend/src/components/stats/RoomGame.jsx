import React, {useEffect, useState} from 'react';
import {Pie} from 'react-chartjs-2';
import PropTypes from "prop-types";

const maxTime = 600;

const RoomGame = (props) => {

	const teams = props.teams;
	const game = props.game;
	const scores = props.scores;

	const calcData = () => {
		const succesScore= [];
		scores.forEach((score) => {
			score.time > maxTime && succesScore.put(score);
		})
		succesScore.forEach();
		//TODO: intégration des stats
	}

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

RoomGame.propTypes = {
	teams: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired,
	game: PropTypes.object.isRequired
}

export default RoomGame;