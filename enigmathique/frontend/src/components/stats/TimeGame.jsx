import React from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

const TimeGame = (props) => {
	// Récupération des équipes et des scores depuis les props
	const teams = props.teams;
	const scores = props.scores;

	// Définition des données pour le graphique (exemple avec une seule donnée)
	const data = {
		labels: ['oui'], // Nom de la donnée
		datasets: [
			{
				label: 'oui', // Nom de la série de données
				data: [50] // Valeur de la donnée (peut être remplacée par une valeur réelle)
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
				{/* Affichage du graphique en barres en utilisant les données définies */}
				<Bar data={data}></Bar>
			</div>
		</div>
	);
};

TimeGame.propTypes = {
	teams: PropTypes.array.isRequired, // Propriété obligatoire : équipes
	scores: PropTypes.array.isRequired // Propriété obligatoire : scores
};

export default TimeGame;
