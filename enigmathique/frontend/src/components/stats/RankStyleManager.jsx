import {FaRegCircle, FaStar} from "react-icons/fa";
import React from "react";
import TeamModel from "../../models/team.model";

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

const getPositionStyle = (index) => {
	return index < 3 ? 'text-white' : 'blue-font-color';
};

const loadMembers = async (idTeam) => {
	return await TeamModel.getStudents(idTeam);
};

const calculateScore = (numSolved, numBadAnswers, numHints, isSolved) => {
	return (
		numSolved * 100 - numBadAnswers * 10 - numHints * 20 + ((isSolved) ? 500 : 0)
	);
};

export {getPositionIcon, getPositionStyle, loadMembers, calculateScore};