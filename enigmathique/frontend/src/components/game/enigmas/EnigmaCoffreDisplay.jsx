import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

const EnigmaCoffreDisplay = ({ handleSubmitAnswer, handleAskHint, title, description, hint, image }) => {
	const [userAnswer, setUserAnswer] = useState('');

	const handleInputChange = (event) => {
		setUserAnswer(event.target.value);
	};

	const handleNumericButtonClick = (number) => {
		// Concaténer le chiffre à la réponse actuelle
		setUserAnswer(userAnswer + number);
	};

	return (
		<>
			<h1>{title}</h1>
			<p>{description}</p>
			{image != null && <img src={image} alt='enigma image' />}
			<input
				type="text"
				placeholder="Code du coffre"
				value={userAnswer}
				onChange={handleInputChange}
				className="form-inputfield-style"
				style={{ border: '2px solid #b3b3b3' }}
				readOnly
			/>

			<div>
				{/* Pavé numérique */}
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px' }}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
						<button key={number} onClick={() => handleNumericButtonClick(number)} className="m-1.5" style={{ background: '#666699', padding: '2px', borderRadius: '8px', width: '5vw' }}>
							{number}
						</button>
					))}
					{/* Bouton zéro */}
					<button onClick={() => handleNumericButtonClick(0)} className="m-1.5" style={{ background: '#666699', padding: '8px', borderRadius: '8px', width: '4vw' }}>
						0
					</button>
					{/* Bouton pour effacer */}
					<button onClick={() => setUserAnswer('')} className="m-1.5" style={{ background: '#666699', padding: '8px', borderRadius: '8px', width: '5vw' }}>
						Suppr
					</button>
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

export default EnigmaCoffreDisplay;

EnigmaCoffreDisplay.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	hint: PropTypes.string,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
};
