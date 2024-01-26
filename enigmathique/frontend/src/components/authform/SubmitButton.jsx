import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant SubmitButton
 * @param text le texte du bouton
 * @param loading l'état du bouton actif ou non
 * @param onClick la fonction à exécuter au clic
 * @returns {Element} le composant SubmitButton
 */
const SubmitButton = ({text, loading, onClick}) => {
	return (
		<button
			className='form-button-style bg-gradient-to-r from-[#4C49ED] to-[#0A06F4]'
			type='submit'
			disabled={loading}
			onClick={onClick}
		>
			{loading && (
				<span className='spinner-border spinner-border-sm'></span>
			)}
			<span>{text}</span>
		</button>
	);
};

SubmitButton.propTypes = {
	text: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	onClick: PropTypes.func,
};

export default SubmitButton;