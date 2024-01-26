import React from 'react';
import PropTypes from 'prop-types';

/**
 * Champ de formulaire pour les textes
 * @param label
 * @param name
 * @param value
 * @param placeholder
 * @param onChange
 * @param style
 * @returns {Element}
 * @constructor
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