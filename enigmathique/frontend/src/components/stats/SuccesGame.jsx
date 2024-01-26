import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const SuccesGame = (props) => {

	// On récupère le jeu et les scores depuis les props
	const game = props.game;
	const scores = props.scores;

	// Données pour le graphique (taux de réussite, à remplacer par les données réelles)
	const data = {
		labels: ['Taux de réussite'],
		datasets: [
			{
				label: '',
				data: [80] // Valeur de test, à remplacer par les données réelles
			}
		]
	};

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<h3>Réussite</h3>
			</div>
			<div>
				{/* Affichage du graphique à barres */}
				<Bar data={data}></Bar>
			</div>
		</div>
	);
};


SuccesGame.propTypes = {
	game: PropTypes.any.isRequired,
	scores: PropTypes.any.isRequired
};
	
export default SuccesGame;
