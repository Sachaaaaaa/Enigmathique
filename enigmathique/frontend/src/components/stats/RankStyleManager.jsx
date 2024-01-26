import { FaRegCircle, FaStar } from 'react-icons/fa';
import React from 'react';
import TeamModel from '../../models/team.model';

// Fonction pour obtenir l'icône en fonction de la position
const getPositionIcon = (index) => {
	switch (index) {
	case 0:
		return <FaStar className="text-4xl text-yellow-400" />;
	case 1:
		return <FaStar className="text-4xl text-gray-500" />;
	case 2:
		return <FaStar className="text-4xl text-orange-600" />;
	default:
		return <FaRegCircle className="text-4xl blue-font-color stroke-2" />;
	}
};

// Fonction pour obtenir le style de la position en fonction de l'index
const getPositionStyle = (index) => {
	return index < 3 ? 'text-white' : 'blue-font-color';
};

// Fonction asynchrone pour charger les membres de l'équipe en utilisant un identifiant d'équipe
const loadMembers = async (idTeam) => {
	return await TeamModel.getStudents(idTeam);
};

// Fonction pour calculer le score en fonction du nombre de résolutions, de mauvaises réponses, de conseils et de la réussite
const calculateScore = (numSolved, numBadAnswers, numHints, isSolved) => {
	return (
		numSolved * 100 - numBadAnswers * 10 - numHints * 20 + ((isSolved) ? 500 : 0)
	);
};

export { getPositionIcon, getPositionStyle, loadMembers, calculateScore };
