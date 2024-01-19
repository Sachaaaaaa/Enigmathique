import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Chronometer = ({ initialTime }) => {
	const [timeRemaining, setTimeRemaining] = useState(initialTime);

	useEffect(() => {
		const timerId = setInterval(() => {
			setTimeRemaining((prevTime) => {
				if (prevTime > 0) {
					return prevTime - 1;
				} else {
					clearInterval(timerId);
					// Mettez ici toute logique à effectuer lorsque le temps est écoulé
					return 0;
				}
			});
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, [initialTime]); // Assurez-vous de déclencher l'effet à chaque changement de initialTime

	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60);
		const seconds = timeInSeconds % 60;
		return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	};

	return (
		<div className='absolute bottom-0 left-0 z-50'>
			<h1 className='text-lg'>Chronomètre</h1>
			<p className='text-lg'>Temps restant : <strong>{formatTime(timeRemaining)}</strong></p>
		</div>
	);
};

export default Chronometer;

Chronometer.propTypes = {
	initialTime: PropTypes.number.isRequired,
};
