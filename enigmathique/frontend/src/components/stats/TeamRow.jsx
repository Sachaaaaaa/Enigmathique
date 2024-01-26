import React from 'react';
import PropTypes from 'prop-types';
import { getPositionStyle, getPositionIcon } from './RankStyleManager'; // Importation de fonctions depuis un autre module
import ActionButton from 'components/dashboard/ActionButton'; // Importation d'un composant d'action
import { getRowColor } from 'components/ListManager'; // Importation d'une fonction de gestion de la couleur de la ligne

const TeamRow = ({ index, team, detailsOnClick }) => {
	return (
		<tr key={team.id} className={getRowColor(index)}> {/* Définition de la classe CSS de la ligne en utilisant une fonction getRowColor */}
			<td className="p-5 flex items-center justify-left">
				<div className={`relative ${getPositionStyle(index)}`}> {/* Utilisation de classes CSS conditionnelles en fonction de l'index */}
					{getPositionIcon(index)} {/* Appel à une fonction pour afficher une icône en fonction de l'index */}
					<span className="absolute inset-0 flex items-center justify-center">
						{index + 1} {/* Affichage de l'index plus un pour représenter le classement */}
					</span>
				</div>
			</td>
			<td className="td-style">
				{team.name} {/* Affichage du nom de l'équipe */}
			</td>
			<td className="td-style">
				{team.calculatedScore} {/* Affichage du score calculé de l'équipe */}
			</td>
			<td className="td-style">
				{team.nbSolved} {/* Affichage du nombre d'énigmes résolues par l'équipe */}
			</td>
			<td className="td-style text-right">
				<ActionButton
					onClick={detailsOnClick} // Gestionnaire d'événements pour le bouton "Détails"
					title='Détails' // Titre du bouton
				>
				</ActionButton>
			</td>
		</tr>
	);
};

TeamRow.propTypes = {
	index: PropTypes.number,
	team: PropTypes.object,
	detailsOnClick: PropTypes.func, // Propriété de gestionnaire d'événements pour le clic sur le bouton "Détails"
};

export default TeamRow;
