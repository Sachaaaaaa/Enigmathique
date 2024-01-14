import React from 'react';
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
	const [room, setRoom] = useState({name: null, enigmasVariables: null, component: null});

	return (
		<RoomContext.Provider value={{ room, setRoom }}>
			{children}
		</RoomContext.Provider>
	);
};

export const useRoom = () => useContext(RoomContext);

RoomProvider.propTypes = {
	children: PropTypes.node.isRequired,
};