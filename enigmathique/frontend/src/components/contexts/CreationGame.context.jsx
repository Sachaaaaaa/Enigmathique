import React, { createContext, useContext, useState } from 'react';
import PropTypes from "prop-types";

const CreationGameContext = createContext(null);
export const initialFormData = {
	gameName: '',
	course: 0,
	teamSize: 1,
}
export const initialFilterData = {
	text:'',
	type:'suit',
}
export const CreationGameDataProvider = (props) => {

	//Data étape 1
	const [step, setStep] = useState(1); //Étape de création
	const [formData, setFormData] = useState(initialFormData); //Nom de la game + Classe sélectionnée + Taille équipe
	const [courses, setCourses] = useState([{}]); //Classes du prof

	//Data étape 2
	const [rooms, setRooms] = useState([]); //Id des rooms sélectionnées
	const [filter, setFilter] = useState(initialFilterData); //Filtres sélectionnés

	//Data pregame
	const [teams, setTeams] = useState([{}]);

	const data = {
		step,
		setStep,
		formData,
		setFormData,
		courses,
		setCourses,
		rooms,
		setRooms,
		teams,
		setTeams,
		filter,
		setFilter
	};

	return (
		<CreationGameContext.Provider value={data}>
			{props.children}
		</CreationGameContext.Provider>
	);
};

CreationGameDataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
// Create a custom hook to easily access the context
export const useCreationGameContext = () => {
	return useContext(CreationGameContext);
};

