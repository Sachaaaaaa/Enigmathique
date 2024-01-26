import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSocket } from 'contexts/SocketContext';
import { ServerToClient } from 'data/socketMessages';
import { FaRegHourglassHalf } from "react-icons/fa6";


const Timer = ({ duration = 600 }) => {
	const socket = useSocket();

	const [startTime, setStartTime] = useState(Date.now());
	const [currentTime, setCurrentTime] = useState(Date.now());

	useEffect(() => {
		const handleStartTimer = () => {
			setStartTime(Date.now());
			console.log('start timer');
		};

		socket.on(ServerToClient.StartRound, handleStartTimer);

		return () => {
			socket.off(ServerToClient.StartRound, handleStartTimer);
		};
	}, []);

	useEffect(() => {
		if (startTime) {
			const interval = setInterval(() => {
				setCurrentTime(Date.now());
			}, 1000);

			return () => {
				clearInterval(interval);
			};
		}
	}, []);

	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	};

	// Miam
	const timeLeft = startTime ? formatTime(Math.max(0, duration - Math.floor((currentTime - startTime) / 1000))) : null;

	return (
		<div className='absolute flex items-center top-0 right-0 z-40 mt-5 mr-5 text-white'>
			<div><FaRegHourglassHalf className='w-7 h-7'/></div>
			<p className='text-3xl'><strong>{timeLeft}</strong></p>
		</div>
	);
};

export default Timer;

Timer.propTypes = {
	duration: PropTypes.number,
};
