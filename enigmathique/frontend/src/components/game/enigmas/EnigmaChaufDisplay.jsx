import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import termos from 'assets/img/termos.png';

const EnigmaChaufDisplay = ({ handleSubmitAnswer, handleAskHint, title, description, hint, image }) => {
	const [userAnswer, setUserAnswer] = useState('');
	const [rotationAngle, setRotationAngle] = useState(0);

	const handleInputChange = (event) => {
		setUserAnswer(event.target.value);
	};

	const handleRotateRight = () => {
		setRotationAngle(rotationAngle + 10);
		setUserAnswer((rotationAngle+100).toString());
	};

	return (
		<>
			<h1>{title}</h1>
			<p>{description}</p>
			{/*image != null && <img src={image} alt='enigma image' />*/}
			<input
				type="text"
				placeholder="Votre réponse"
				value={userAnswer}
				onChange={handleInputChange}
				className="m-1.5"
				style={{ border: '2px solid #b3b3b3' }}
			/>

			{/* Bouton tournant */}
			<div style={{ position: 'relative', height: '8vh' }}>
				<div style={{ position: 'absolute', top: '50%', left: '50%', transform: `translate(-40%, -50%) rotate(${rotationAngle}deg)` }}>
					<button onClick={handleRotateRight} style={{ background: '#00e600', padding: '8px', borderRadius: '50%', cursor: 'pointer', width: '4em', height: '4em' }}>
						<img src={termos} alt="img Termos"/>
					</button>
				</div>
			</div>

			{!hint && (
				<button onClick={() => handleAskHint()} className="m-1.5" style={{ background: '#ffcc00', padding: '8px', borderRadius: '8px', width: '12vw' }}>
					<BsQuestionDiamondFill/>
				</button>
			)}

			{hint && <p className="m-1.5">{hint}</p>}

			<button onClick={() => handleSubmitAnswer(userAnswer)} className="m-1.5" style={{ background: '#00ff00', padding: '8px', borderRadius: '8px', width: '12vw' }}>
				<FaCheck/>
			</button>
		</>
	);
};

export default EnigmaChaufDisplay;

EnigmaChaufDisplay.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	hint: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
};
