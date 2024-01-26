import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import ValidateButton from './ValidateButton';
import HintButton from './HintButton';

const EnigmaWithSlidersDisplay = ({ handleSubmitAnswer, handleAskHint, title, description, titreSlider, isSolved, hint, image }) => {
	const [userAnswer, setUserAnswer] = useState('');
	const handleInputChange = (event) => {
		setUserAnswer(event.target.value);
	};

	const [sliderValues, setSliderValues] = useState([50]);

	const handleSliderChange = (index, value) => {
		const newSliderValues = [...sliderValues];
		newSliderValues[index] = value;
		setSliderValues(newSliderValues);
		setUserAnswer(sliderValues.reduce((acc, value) => acc + value, 0));
	};

	const generateMarks = () => {
		const marks = {};
		for (let i = 0; i <= 100; i += 10) {
			marks[i] = i.toString();
		}
		return marks;
	};


	return (
		<div className='flex flex-col gap-2'>
			<h1>{title}</h1>
			<p>{description}</p>
			{image != null && <img src={image} alt='enigma image' />}
			<input
				type="text"
				placeholder="Votre réponse"
				value={userAnswer}
				onChange={handleInputChange}
				className="form-inputfield-style disabled:opacity-50"
				readOnly
				disabled={isSolved}
			/>

			<div className='mb-8'>
				<div>
					<p>{titreSlider} {/*sliderValues[0]*/}</p>
					<Slider disabled={isSolved} value={sliderValues[0]} onChange={(value) => handleSliderChange(0, value)} marks={generateMarks()} step={1} />
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

export default EnigmaWithSlidersDisplay;

EnigmaWithSlidersDisplay.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	isSolved: PropTypes.bool.isRequired,
	description: PropTypes.string.isRequired,
	titreSlider: PropTypes.string,
	image: PropTypes.string,
	answer: PropTypes.number,
	hint: PropTypes.string,
};