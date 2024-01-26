import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const GameTeam = (props) => {

	// On récupère les scores depuis les props
	const scores = props.scores;

	// Fonction pour convertir les secondes en format minutes:secondes
	const secondsToTime = (seconds) => {
		const minAndSec = [Math.floor(seconds / 60), seconds % 60];
		return minAndSec[0].toString().concat(':', minAndSec[1].toString());
	};

	// On prépare les données pour le graphique en utilisant les scores
	const data = {
		labels: scores.map((score) => (score.roomName)),
		datasets: [
			{
				label: 'Temps par salle',
				data: scores.map((score) => (score.time))
			}
		]
	};

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<h3>Temps de jeu</h3>
			</div>
			<div>
				<ul>
					{/* On affiche la liste des scores */}
					{scores.map((score, index) => (
						<li key={index}>{score.roomName}<span>{secondsToTime(score.time)}</span></li>
					))}
				</ul>
				{/* On affiche le graphique en utilisant les données préparées */}
				<Doughnut data={data} title='salut' />
			</div>
		</div>
	);
};

// On définit les propTypes pour les scores
GameTeam.propTypes = {
	scores: PropTypes.array.isRequired
};

export default GameTeam;
