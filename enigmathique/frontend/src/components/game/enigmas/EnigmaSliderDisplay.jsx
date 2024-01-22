import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

const EnigmaWithSlidersDisplay = ({ handleSubmitAnswer, handleAskHint, title, description, hint, image }) => {
	const [userAnswer, setUserAnswer] = useState('');
	const handleInputChange = (event) => {
		setUserAnswer(event.target.value);
	};

	const [sliderValues, setSliderValues] = useState([50, 50, 50]);

	const handleSliderChange = (index, value) => {
		const newSliderValues = [...sliderValues];
		newSliderValues[index] = value;
		setSliderValues(newSliderValues);
		setUserAnswer(sliderValues.reduce((acc, value) => acc + value, 0));

	};

	const handleSumit = () => {
		// Calcul de la somme des valeurs des sliders
		const sum = sliderValues.reduce((acc, value) => acc + value, 0);
		// Appel de la fonction pour soumettre la réponse
		handleSubmitAnswer(sum);
	};

	return (
		<>
			<h1>{title}</h1>
			<p>{description}</p>
			{image != null && <img src={image} alt='enigma image' />}
			<input
				type="text"
				placeholder="Votre réponse"
				value={userAnswer}
				onChange={handleInputChange}
				className="m-1.5"
				style={{ border: '2px solid #b3b3b3' }}
				readOnly
			/>

			<div>
				<div>
					<p>Slider 1: {sliderValues[0]}</p>
					<Slider value={sliderValues[0]} onChange={(value) => handleSliderChange(0, value)} />
				</div>

				<div>
					<p>Slider 2: {sliderValues[1]}</p>
					<Slider value={sliderValues[1]} onChange={(value) => handleSliderChange(1, value)} />
				</div>

				<div>
					<p>Slider 3: {sliderValues[2]}</p>
					<Slider value={sliderValues[2]} onChange={(value) => handleSliderChange(2, value)} />
				</div>
			</div>

			{!hint && (
				<button onClick={() => handleAskHint()} className="m-1.5"
					style={{
						background: '#ffcc00',
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						padding: '8px',
						borderRadius: '8px',
					}}>
					<BsQuestionDiamondFill /> Indice
				</button>
			)}

			{hint && <p className="m-1.5">{hint}</p>}

			<button onClick={() => handleSubmitAnswer(userAnswer)} className="m-1.5"
				style={{
					background: '#00ff00',
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					padding: '8px',
					borderRadius: '8px',
				}}>
				<FaCheck /> Valider
			</button>
		</>
	);
};

export default EnigmaWithSlidersDisplay;

EnigmaWithSlidersDisplay.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
	answer: PropTypes.number,
	hint: PropTypes.string,
};