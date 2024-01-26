import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';
import ValidateButton from 'components/game/enigmas/ValidateButton';
import HintButton from 'components/game/enigmas/HintButton';

const EnigmaCoffreDisplay = ({ handleSubmitAnswer, handleAskHint, description, answerLength, hint, isSolved, image }) => {
	const [userAnswer, setUserAnswer] = useState('');

	const handleNumericButtonClick = (number) => {
		// Concaténer le chiffre à la réponse actuelle
		if (userAnswer.length >= answerLength) return ;
		setUserAnswer(userAnswer + number);
	};

	let placeholder = '';
	for (let i = 0; i < answerLength; i++) {
		placeholder += 'X';
	}
	return (
		<div className='flex flex-col gap-2'>
			<p>{description}</p>
			{image != null && <img src={image} alt='enigma image' />}


			<div className='bg-black'>
				<input
					type="text"
					placeholder={placeholder}
					value={userAnswer}
					disabled={isSolved}
					className="chest-input"
					readOnly
				/>
				{/* Pavé numérique */}
				<div className='grid gap-[1px]' style={{ gridTemplateColumns: 'repeat(3, 1fr)'}}>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
						<button disabled={isSolved} key={number} onClick={() => handleNumericButtonClick(number)} className="chest-button">
							{number}
						</button>
					))}
					<div className='empty-chest-button'></div>
					{/* Bouton zéro */}
					<button disabled={isSolved} onClick={() => handleNumericButtonClick(0)} className="chest-button">
						0
					</button>
					{/* Bouton pour effacer */}
					<button disabled={isSolved} onClick={() => setUserAnswer('')} className="chest-button">
						Suppr
					</button>
				
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

export default EnigmaCoffreDisplay;

EnigmaCoffreDisplay.propTypes = {
	handleSubmitAnswer: PropTypes.func.isRequired,
	handleAskHint: PropTypes.func.isRequired,
	hint: PropTypes.string,
	isSolved: PropTypes.bool.isRequired,
	description: PropTypes.string.isRequired,
	image: PropTypes.string,
	answerLength: PropTypes.number.isRequired,
};
