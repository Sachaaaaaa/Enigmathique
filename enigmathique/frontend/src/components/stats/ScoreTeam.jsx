import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ScoreModel from '../../models/score.model';

// Durée maximale en secondes pour considérer un score comme un succès
const maxTime = 600;

const ScoreTeam = (props) => {

	const scores = props.scores;

	// État pour gérer l'option sélectionnée (global ou salle spécifique)
	const [option, setOption] = useState('global');

	// Gestionnaire pour changer l'option sélectionnée
	const handleOption = (e) => {
		setOption(e.target.value);
	};

	// Fonction pour obtenir les données de la salle spécifique ou globale
	const getRoom = (roomName, scores) => {
		if (scores.length === 0) return;

		if (roomName === 'global') {
			// Calcul des statistiques globales à partir de tous les scores
			return {
				idTeam: scores[0].idTeam,
				roomName: 'global',
				idGame: scores[0].idGame,
				time: scores.reduce((sum, score) => sum + score.time, 0),
				nbGoodAnswers: scores.reduce((sum, score) => sum + score.nbGoodAnswers, 0),
				nbBadAnswers: scores.reduce((sum, score) => sum + score.nbBadAnswers, 0),
				nbHints: scores.reduce((sum, score) => sum + score.nbHints, 0),
				createdAt: scores[0].createdAt,
				updatedAt: scores[0].updatedAt
			};
		} else {
			// Recherche du score correspondant à la salle spécifique
			let i = 0;
			let theScore = scores[i];
			while (theScore.roomName !== roomName) {
				i++;
				theScore = scores[i];
			}
			return theScore;
		}
	};

	if (scores == null || scores.length === 0) return <div>Chargement...</div>;

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<div>
					<h3>Score</h3>
					{/* Sélecteur pour choisir entre Global et les salles spécifiques */}
					<select onChange={handleOption}>
						<option value='global'>Global</option>
						{scores.map((score, index) => (
							<option key={index} value={score.roomName}>{score.roomName}</option>
						))}
					</select>
				</div>
			</div>
			<div>
				<section>
					{/* Image du logo */}
					<img src='' alt='logo'/>
					<p>Indices utilisés</p>
					{/* Affichage du nombre d'indices utilisés pour la salle sélectionnée */}
					<p>{getRoom(option, scores).nbHints}</p>
				</section>
			</div>
		</div>
	);
};

// Définition des propTypes pour les scores attendus par le composant
ScoreTeam.propTypes = {
	scores: PropTypes.array.isRequired
};

export default ScoreTeam;
