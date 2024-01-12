import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';

import { socket } from '../context/socket';
import { ClientToServer } from '../data/socketMessages';

extend({ Html });

const Enigme = ({ title, text, image, answer, hint }) => {
	const [isPuzzleVisible, setIsPuzzleVisible] = useState(true);
	const [userAnswer, setUserAnswer] = useState('');
	const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
	const [showHint, setShowHint] = useState(false);
	
	const handleCancelClick = () => {
		setIsPuzzleVisible(false);
	};

	const handleInputChange = (e) => {
		setUserAnswer(e.target.value);
	};

	const handleCheckAnswer = () => {
		const isNumeric = !isNaN(parseFloat(userAnswer)) && isFinite(userAnswer);
		setIsAnswerCorrect(isNumeric);

		socket.emit(ClientToServer.Submit, { userAnswer, isNumeric });
	};

	const handleShowHint = () => {
		setShowHint(true);
	};

	useEffect(() => {
		const handleServerSubmit = (data) => {
			setIsAnswerCorrect(data.isAnswerCorrect);
			setShowHint(data.showHint);
		};

		socket.on(ClientToServer.Submit, handleServerSubmit);

		return () => {
			socket.off(ClientToServer.Submit, handleServerSubmit);
		};
	}, []);

	if (!isPuzzleVisible) {
		return null;
	}

	return (
		<Html>
			<div
				style={{
					position: 'absolute',
					transform: 'translate(-50%, 0%)',
					top: '50%',
					left: '50%',
					padding: '15px',
					background: 'white',
					borderRadius: '5px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<h1>{title}</h1>
				<p>{text}</p>
				<img src={`/models/models/${image}.png`} alt="Puzzle" />

				<input
					type="text"
					value={userAnswer}
					onChange={handleInputChange}
					placeholder="Enter your answer"
					style={{ margin: '10px 0', padding: '5px' }}
				/>

				<button onClick={handleCheckAnswer} style={{ margin: '5px 0' }}>
					Check Answer
				</button>
				{isAnswerCorrect && <p style={{ color: 'green' }}>Correct</p>}
				{!isAnswerCorrect && <p style={{ color: 'red' }}>----</p>}

				{!showHint && (
					<button onClick={handleShowHint} style={{ margin: '10px 0' }}>
						Get Hint
					</button>
				)}
				{showHint && <p>{hint}</p>}

				<button onClick={handleCancelClick} style={{ marginTop: '10px' }}>
					Go Back
				</button>
			</div>
		</Html>
	);
};

Enigme.propTypes = {
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	image: PropTypes.string,
	answer: PropTypes.number,
	hint: PropTypes.string,
};

export default Enigme;
