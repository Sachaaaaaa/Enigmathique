import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';


const BasicDisplayTemplate = ({ title, description, hint, image, handleSubmitAnswer, handleAskHint}) => {
	const [userAnswer, setUserAnswer] = useState('');
	
	const handleInputChange = (event) => {
		setUserAnswer(event.target.value.replace(/[^0-9]/g, ""));
	};

	return (
		<>
			<h1>{title}</h1>
			<p>{description}</p>
			{image != null && <img src={image} alt='enigma image' />}
			<input
				type="text"
				pattern="[0-9]*"
				placeholder="Numéro du tiroir"
				value={userAnswer}
				onChange={() =>handleInputChange}
				className="form-inputfield-style"
			/>
			
			{!hint && (
				<button onClick={() => handleAskHint()} 
				className="m-1.5"
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

export default BasicDisplayTemplate;

BasicDisplayTemplate.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	hint : PropTypes.string,
	enigmaState: PropTypes.object,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
};