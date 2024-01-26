import React from 'react';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

// Durée maximale en secondes pour considérer un score comme un succès
const maxTime = 600;

const RoomGame = (props) => {

	// On récupère les équipes, le jeu et les scores depuis les props
	const teams = props.teams;
	const game = props.game;
	const scores = props.scores;

	// Fonction pour calculer les données du graphique en fonction des scores
	const calcData = () => {
		const succesScore = [];
		scores.forEach((score) => {
			// On vérifie si le temps dépasse la durée maximale
			if (score.time > maxTime) {
				// Si oui, on ajoute ce score aux succès
				succesScore.push(score);
			}
		});
		// TODO: Intégration des statistiques ici
	};

	// Données de test pour le graphique (à remplacer par les données réelles)
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
RoomGame.propTypes = {
	teams: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired,
	game: PropTypes.object.isRequired
};

export default RoomGame;
