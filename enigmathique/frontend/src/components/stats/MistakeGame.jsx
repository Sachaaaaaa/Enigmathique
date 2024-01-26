import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const MistakeGame = (props) => {

	// On récupère les équipes, le jeu et les scores depuis les props
	const teams = props.teams;
	const game = props.game;
	const scores = props.scores;

	// On prépare les données pour le graphique
	const data = {
		labels: [...Array(scores.length / teams.length).keys()],
		datasets: [
			{
				label: 'succès',
				data: [50] // Valeur de test, à remplacer par les données réelles
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
};

// On définit les propTypes pour les équipes, les scores et le jeu
MistakeGame.propTypes = {
	teams: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired,
	game: PropTypes.object.isRequired
};

export default MistakeGame;
