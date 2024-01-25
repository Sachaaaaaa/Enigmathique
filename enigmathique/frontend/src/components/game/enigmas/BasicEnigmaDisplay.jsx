import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';


const BasicDisplayTemplate = ({ title, description, placeholder = "Votre réponse", isNumberOnly, hint, isSolved = false, image, handleSubmitAnswer, handleAskHint}) => {
	const [userAnswer, setUserAnswer] = useState('');
	
	const handleInputChange = (event) => {
		if (isNumberOnly) setUserAnswer(event.target.value.replace(/[^0-9]/g, ""));
		else setUserAnswer(event.target.value);
	};

	return (
		<div className='flex flex-col gap-2'>
			<h1>{title}</h1>
			<p>{description}</p>
			{image != null && <img src={image} alt='enigma image' />}
			<input
				type="text"
				placeholder={placeholder}
				disabled={isSolved}
				value={userAnswer}
				onChange={handleInputChange}
				className="form-inputfield-style disabled:opacity-50"
			/>
			
			{(!hint && !isSolved) && (
				<button onClick={() => handleAskHint()} 
				className="hint-button">
					<BsQuestionDiamondFill /> Indice
				</button>
			)}

			{hint && <p className="m-1.5">{hint}</p>}

			{!isSolved && <button onClick={() => handleSubmitAnswer(userAnswer)} className="validate-button">
				<FaCheck /> Valider
			</button> }
		</div>
	);
};

export default BasicDisplayTemplate;

BasicDisplayTemplate.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	hint : PropTypes.string,
	isSolved: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	isNumberOnly: PropTypes.bool,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
};