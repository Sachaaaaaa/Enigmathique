import React from 'react';
import PropTypes from 'prop-types';

const Textfield = ({ label, name, type, value,placeholder, onChange }) => {
    return (
        <div className='w-full mb-4 primary-font-color'>
            <label className='form-label-style' htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className='form-inputfield-style'
                required
            />
           
        </div>
    );
};

Textfield.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Textfield;