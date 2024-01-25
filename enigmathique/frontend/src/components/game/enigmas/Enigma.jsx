import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';

import { useRoom } from 'contexts/RoomContext';
import { useSocket } from 'contexts/SocketContext';
import useMemoryState from 'hooks/useMemoryState';
import { ClientToServer, ServerToClient } from 'data/socketMessages';
import ClosePopup from '../informations/ClosePopup';


extend({ Html });

const Enigma = ({ enigmaId, enigmaDisplayTemplate, closeEnigma, title="" }) => {
	const { room } = useRoom();
	const socket = useSocket();

	const [enigmaState, setEnigmaState] = useMemoryState(room.name + enigmaId, { isSolved: false, endMessage: null, hint: null });

	// Recupère les données dynamiques de l'énigme (envoyées par le serveur)
	if (!room.variables[enigmaId]) {
		throw new Error(`L'énigme ${enigmaId} n'existe pas!`);
	}
	const variables = room.variables[enigmaId];

	const submitAnswer = (answer) => {
		console.log('submit answer', answer);
		socket.emit(ClientToServer.Submit, { enigmaId, answer });
	};

	const askHint = () => {
		console.log('ask hint');
		if (enigmaState.isSolved) {
			return;
		} else {
			socket.emit(ClientToServer.AskHint, { enigmaId });
		}
	};

	useEffect(() => {
		const handleAnswerFeedback = (data) => {
			const _enigmaId = data.enigmaId;
			const _isSolved = data.isSolved;
			const _endMessage = data.endMessage;

			if (_enigmaId == null || _enigmaId !== enigmaId) {
				return;
			}

			if (_isSolved) {
				setEnigmaState({ isSolved: true, endMessage: _endMessage, hint: null });
			}
		};

		const handleHintFeedback = (data) => {
			const _enigmaId = data.enigmaId;

			if (_enigmaId == null || enigmaId !== _enigmaId) {
				return;
			}

			const _hint = data.hint;
			setEnigmaState({ hint: _hint });
		};

		socket.on(ServerToClient.Feedback, handleAnswerFeedback);
		socket.on(ServerToClient.Hint, handleHintFeedback);
		return () => {
			socket.off(ServerToClient.Feedback, handleAnswerFeedback);
			socket.off(ServerToClient.Hint, handleHintFeedback);
		};

	}, []);

	return (
		<Html>
			<div className={`pop-up-container max-w-[300px]
			${!enigmaState.isSolved ? 'border-4 border-red-600' : 'border-4 border-green-600'}`}>
				<div className='flex justify-between items-start w-full '>
					<h1 className='pop-up-title p-3'>{title} </h1>
					<ClosePopup onClick={closeEnigma}></ClosePopup>
				</div>

				<div className='p-3 pt-0'>
				{enigmaDisplayTemplate(variables, enigmaState.hint, enigmaState.isSolved, submitAnswer, askHint)}
				<div className='m-1.5 text-green-600'>
					{enigmaState.isSolved && <p>{enigmaState.endMessage}</p>}
				</div>
				</div>

			</div>
		</Html>
	);
};

export default Enigma;

Enigma.propTypes = {
	enigmaId: PropTypes.number.isRequired,
	enigmaDisplayTemplate: PropTypes.elementType.isRequired,
	closeEnigma: PropTypes.func.isRequired,
	title: PropTypes.string,
};
