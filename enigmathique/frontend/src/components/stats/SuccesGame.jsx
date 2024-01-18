import React from 'react';
import {Bar} from 'react-chartjs-2';

const SuccesGame = (props) => {

	const game = props.game;
	const scores = props.scores;

	const data = {
		labels: ['Taux de réussite'],
		datasets: [
			{
				label: '',
				data: [80]
			}
		]
	}

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<h3>Réussite</h3>
			</div>
			<div>
				<Bar data={data}></Bar>
			</div>
		</div>
	);
}

export default SuccesGame;