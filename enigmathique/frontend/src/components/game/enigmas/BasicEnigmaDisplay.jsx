import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';


const BasicDisplayTemplate = ({ handleSubmitAnswer, handleAskHint, title, description, hint, image }) => {
	const [userAnswer, setUserAnswer] = useState('');

	const handleInputChange = (event) => {
		setUserAnswer(event.target.value);
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
				style={{border: '2px solid #b3b3b3'}} 
			/>
			
			{!hint && < button onClick={() => handleAskHint()} className="m-1.5"
				style={{
					background: '#ffcc00',
					padding: '8px',
					borderRadius: '8px',
					width: '12vw'
				}}><BsQuestionDiamondFill/></button>}

			{hint && <p className="m-1.5">{hint}</p>}

			<button onClick={() => handleSubmitAnswer(userAnswer)} className="m-1.5"
				style={{
					background: '#00ff00',
					padding: '8px',
					borderRadius: '8px',
					width: '12vw',
				}}><FaCheck/></button>
		</>
	);
};

export default BasicDisplayTemplate;

BasicDisplayTemplate.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	hint: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
};