import React, { createContext, useContext, useState } from 'react';
import PropTypes from "prop-types";

const CreationGameContext = createContext(null);

export const CreationGameDataProvider = (props) => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({gameName:null, course:null, teamSize:null});

	const data = {
		step,
		setStep,
		formData,
		setFormData,
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