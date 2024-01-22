// RoomCompletionContext.jsx
import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const RoomCompletionContext = createContext();

export const RoomCompletionProvider = ({ children }) => {
	const [isRoomCompleted, setIsRoomCompleted] = useState(false);

	const completeRoom = () => {
		setIsRoomCompleted(true);
	};

	const resetRoomCompletion = () => {
		setIsRoomCompleted(false);
	};

	return (
		<RoomCompletionContext.Provider value={{ isRoomCompleted, completeRoom, resetRoomCompletion }}>
			{children}
		</RoomCompletionContext.Provider>
	);
};

export const useRoomCompletion = () => {
	return useContext(RoomCompletionContext);
};

RoomCompletionProvider.propTypes = {
	children: PropTypes.node.isRequired,
};