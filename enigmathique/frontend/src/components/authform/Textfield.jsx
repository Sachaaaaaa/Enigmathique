import React, {useState} from 'react';
import PropTypes from 'prop-types';


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