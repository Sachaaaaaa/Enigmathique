import React from "react";
import {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";

const PreGameContext = createContext(null);

export const PreGameDataProvider = (props) => {
	const [teams, setTeams] = useState([{}]);
	const [idGame, setIdGame] = useState(0);

	const data = {
		teams,
		setTeams,
	};

	return (
		<PreGameContext.Provider value={data}>
			{props.children}
		</PreGameContext.Provider>
	);
}
PreGameDataProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
export const usePreGameContext = () => {
	return useContext(PreGameContext);
}

