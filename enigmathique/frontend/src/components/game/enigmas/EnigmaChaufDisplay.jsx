import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import termos from 'assets/img/termos.png';
import ValidateButton from 'components/game/enigmas/ValidateButton';
import HintButton from 'components/game/enigmas/HintButton';
import TemperatureButton from './TemperatureButton';

const EnigmaChaufDisplay = ({ handleSubmitAnswer, handleAskHint, description, hint,isSolved, image, stepButton }) => {
	const [userAnswer, setUserAnswer] = useState('');
	const [temperature, setTemperature] = useState(0);
	const [firstBtnAngle, setFirstBtnAngle] = useState(0);
	const [secondBtnAngle, setSecondBtnAngle] = useState(0);
	const [thirdBtnAngle, setThirdBtnAngle] = useState(0);

	const handleInputChange = (event) => {
		setUserAnswer(event.target.value);
	};

	useEffect(() => {
		setUserAnswer(temperature.toString());
	}, [temperature]);

	const handleRotation = (step,idBtn) => {
		setTemperature(temperature + step);
		switch (idBtn) {
			case 1:
				setFirstBtnAngle(firstBtnAngle + 20);
				break;
			case 2:
				setSecondBtnAngle(secondBtnAngle - 20);
				break;
			case 3:
				setThirdBtnAngle(thirdBtnAngle + 20);
				break;
		}
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
			<div className='flex justify-around px-5 bg-[#2B2B2B] '>
				<div className='grow relative h-[100px] '>
					<div className="absolute top-[50%] left-[50%] flex flex-col justify-center items-center " style={{transform: `translate(-40%, -50%)` }}>
						<button disabled={isSolved} onClick={() =>handleRotation(stepButton,1)} className='w-16 h-16 p-1 bg-black-color rounded-full cursor-pointer disabled:opacity-50'>
							<img src={termos} alt="img Termos" style={{transform : `rotate(${firstBtnAngle}deg)` }} />
							</button>
							<p className='text-white text-sm text-center'> {stepButton < 0 ? "- ": "+ " }{stepButton}</p>
					</div>
				</div>
				<div className='grow relative h-[100px] '>
					<div className="absolute top-[50%] left-[50%] flex flex-col justify-center items-center " style={{transform: `translate(-40%, -50%)` }}>
						<button disabled={isSolved} onClick={() =>handleRotation(-1,2)} className='w-16 h-16 p-2 bg-black-color rounded-full cursor-pointer disabled:opacity-50'>
							<img src={termos} alt="img Termos" style={{transform : `rotate(${secondBtnAngle}deg)` }} />
						</button>
						<p className='text-white text-sm text-center'> - 1</p>
					</div>
				</div>
				<div className='grow relative h-[100px] '>
					<div className="absolute top-[50%] left-[50%] flex flex-col justify-center items-center " style={{transform: `translate(-40%, -50%)` }}>
						<button disabled={isSolved} onClick={() =>handleRotation(1,3)} className='w-16 h-16 p-2 bg-black-color rounded-full cursor-pointer disabled:opacity-50'>
							<img src={termos} alt="img Termos" style={{transform : `rotate(${thirdBtnAngle}deg)` }} />
						</button>
						<p className='text-white text-sm text-center'> + 1</p>
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
