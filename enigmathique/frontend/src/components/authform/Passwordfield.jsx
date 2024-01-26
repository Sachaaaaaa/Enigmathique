import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {IoEye, IoEyeOff} from 'react-icons/io5';

/**
 * Composant Passwordfield
 * @param label le label du champ
 * @param name le nom du champ
 * @param value la valeur du champ
 * @param onChange la fonction de changement de la valeur du champ
 * @param style le style du champ modifié conditionnellement
 * @returns {Element} le composant Passwordfield
 */
const Passwordfield = ({label, name, value, onChange, style}) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className='mb-4 w-full'>
			<label className='form-label-style' htmlFor={name}>
				{label}
			</label>
			<div className='relative'>
				<input
					type={showPassword ? 'text' : 'password'}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					placeholder='Votre mot de passe'
					className={`form-inputfield-style ${style}`}
					required
				/>
				<button
					className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
					onMouseDown={() => setShowPassword(true)}
					onMouseUp={() => setShowPassword(false)}
					type="button"
				>
					{showPassword ? <IoEye size={20}/> : <IoEyeOff size={20}/>}
				</button>
			</div>
		</div>
	);
};

Passwordfield.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	style: PropTypes.string,
};

export default Passwordfield;