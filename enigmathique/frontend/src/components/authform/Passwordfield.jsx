import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const Passwordfield = ({ label, name, value, onChange }) => {
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
                    className='form-inputfield-style'
                    required
                />
                <button
                    className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    type="button"
                >
                    {showPassword ? <IoEye size={20}/> : <IoEyeOff size={20} />}
                </button>
            </div>
        </div>
    );
}

Passwordfield.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Passwordfield;