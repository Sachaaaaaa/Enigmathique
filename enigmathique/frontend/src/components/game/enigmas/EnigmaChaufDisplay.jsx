import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import termos from 'assets/img/termos.png';
import ValidateButton from 'components/game/enigmas/ValidateButton';
import HintButton from 'components/game/enigmas/HintButton';

const EnigmaChaufDisplay = ({ handleSubmitAnswer, handleAskHint, title, description, hint,isSolved, image, stepButton }) => {
	const [userAnswer, setUserAnswer] = useState('');
	const [temperature, setTemperature] = useState(0);
	const [rightRotationAngle, setRightRotationAngle] = useState(0);
	const [leftRotationAngle, setLeftRotationAngle] = useState(0);

	const handleInputChange = (event) => {
		setUserAnswer(event.target.value);
	};

	const handleRotateRight = () => {
		setRightRotationAngle(rightRotationAngle + stepButton);
		setUserAnswer((temperature + stepButton).toString());
		setTemperature(temperature + stepButton);
	};
	const handleRotateLeft = () => {
		setLeftRotationAngle(leftRotationAngle - stepButton);
		setUserAnswer((temperature - stepButton).toString());
		setTemperature(temperature - stepButton);
	}

	return (
		<div className='flex flex-col gap-2'>
			<h1>{title}</h1>
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
			<div className='flex justify-around px-10'>
				<div className='grow relative h-[100px]'>
					<div className="absolute top-[50%] left-[50%] " style={{transform: `translate(-40%, -50%) rotate(${rightRotationAngle}deg)` }}>
						<button disabled={isSolved} onClick={handleRotateRight} className='w-16 h-16 p-2 bg-black-color rounded-full cursor-pointer disabled:opacity-50'>
							<img src={termos} alt="img Termos" />
						</button>
					</div>
				</div>
				<div className='grow relative h-[100px]'>
				<div className="absolute top-[50%] left-[50%] " style={{transform: `translate(-40%, -50%) rotate(${leftRotationAngle}deg)` }}>
					<button  disabled={isSolved} onClick={handleRotateLeft} className='w-16 h-16 p-2 bg-black-color rounded-full cursor-pointer disabled:opacity-50'>
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
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
	stepButton: PropTypes.number.isRequired,
};
