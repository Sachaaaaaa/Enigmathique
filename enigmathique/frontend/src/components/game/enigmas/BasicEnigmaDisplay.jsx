import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';


const BasicDisplayTemplate = ({ title, description, hint, isSolved = false, image, handleSubmitAnswer, handleAskHint }) => {
	const [userAnswer, setUserAnswer] = useState('');

	const handleInputChange = (event) => {
		// setUserAnswer(event.target.value.replace(/[^0-9]/g, ""));
		setUserAnswer(event.target.value);
	};

	return (
		<div className='flex flex-col gap-2'>
			<h1>{title}</h1>
			<p>{description}</p>
			{image != null && <img src={image} alt='enigma image' />}
			{/* <input
				type="text"
				pattern="[0-9]*"
				placeholder="Numéro du tiroir"
				value={userAnswer}
				onChange={handleInputChange}
				className="form-inputfield-style"
			/> */}
			<input
				type="text"
				placeholder="Votre réponse"
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
			</button>}
		</div>
	);
};

export default BasicDisplayTemplate;

BasicDisplayTemplate.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	hint: PropTypes.string,
	isSolved: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
};