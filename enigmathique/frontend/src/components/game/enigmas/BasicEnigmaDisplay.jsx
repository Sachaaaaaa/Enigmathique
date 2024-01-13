import React, { useState } from 'react';
import PropTypes from 'prop-types';


const BasicDisplayTemplate = ({handleSubmitAnswer, title, description, image}) => {
	const [userAnswer, setUserAnswer] = useState('');
	
	const handleInputChange = (event) => {
		setUserAnswer(event.target.value);
	};
	
	
	return (
		<>
			<h1>{title}</h1>
			<p>{description}</p>
			<img src={image} alt='enigma image'/>
			<input
				type="text"
				value={userAnswer}
				onChange={handleInputChange}
				className="m-1.5" />
			<button onClick={() => handleSubmitAnswer(userAnswer)} className="m-1.5">Check Answer</button>
		</>
	);
};

export default BasicDisplayTemplate;

BasicDisplayTemplate.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
};