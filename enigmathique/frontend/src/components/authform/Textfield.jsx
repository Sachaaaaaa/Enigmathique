import React from 'react';
import PropTypes from 'prop-types';


/**
 * Composant Textfield
 * @param label le label du champ
 * @param name le nom du champ
 * @param value la valeur du champ
 * @param placeholder le placeholder du champ
 * @param onChange la fonction de changement de la valeur du champ
 * @param style le style du champ modifié conditionnellement
 * @returns {Element} le composant Textfield
 */
const Textfield = ({label, name, value, placeholder, onChange, style}) => {
	
	return (
		<div className='w-full mb-4 primary-font-color'>
			<label className='form-label-style' htmlFor={name}>
				{label}
			</label>
			<input
				type={name==='mail' ? 'email' : 'text'}
				id={name}
				name={name}
				value={value}
				placeholder={placeholder}
				maxLength={30}
				onChange={onChange}
				className={`form-inputfield-style ${style}`}
				required
			/>
		</div>
	);
};

Textfield.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	style: PropTypes.string,
};

export default Textfield;