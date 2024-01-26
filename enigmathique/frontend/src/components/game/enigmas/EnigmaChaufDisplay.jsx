import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import termos from 'assets/img/termos.png';
import ValidateButton from 'components/game/enigmas/ValidateButton';
import HintButton from 'components/game/enigmas/HintButton';
import TemperatureButton from './TemperatureButton';

const EnigmaChaufDisplay = ({ handleSubmitAnswer, handleAskHint, description, hint,isSolved, image, stepButton }) => {
	const [userAnswer, setUserAnswer] = useState('');
	const [temperature, setTemperature] = useState(0);

	const handleInputChange = (event) => {
		setUserAnswer(event.target.value);
	};

	useEffect(() => {
		setUserAnswer(temperature.toString());
	}, [temperature]);

	const handleRotation = (step) => {
		setTemperature(temperature + step);
	}

	return (
		<div className='flex flex-col gap-2'>
			<p>{description}</p>
			{/*image != null && <img src={image} alt='enigma image' />*/}
			<input
				type="text"
				placeholder="Température"
				value={userAnswer}
				onChange={handleInputChange}
				className="form-inputfield-style disabled:opacity-50"
				readOnly
			/>

			{/* Bouton tournant */}
			<div className='flex justify-around px-10 bg-black '>
				<TemperatureButton step={stepButton} onClick={() =>handleRotation(stepButton)} isSolved={isSolved}/>
				<div className='grow relative h-[100px]'>
				<div className="absolute top-[50%] left-[50%] " style={{transform: `translate(-40%, -50%))` }}>
					<button  disabled={isSolved} onClick={handleRotation} className='w-16 h-16 p-2 bg-black-color rounded-full cursor-pointer disabled:opacity-50'>
						<img src={termos} alt="img Termos" />
					</button>
				</div>
			</div>
			</div>
			{(!hint && !isSolved) && (
				<HintButton onClick={() => handleAskHint()} />
			)}
		
			{hint && <p className="hint-text">{hint}</p>}

			{!isSolved && <ValidateButton onClick={()=> handleSubmitAnswer(userAnswer)}/> }
		</div>
	);
};

export default EnigmaChaufDisplay;

EnigmaChaufDisplay.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	hint: PropTypes.string,
	isSolved: PropTypes.bool.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
	stepButton: PropTypes.number.isRequired,
};
