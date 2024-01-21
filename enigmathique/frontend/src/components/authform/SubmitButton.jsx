import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ text, loading }) => {
    return (
        <button
            className='form-button-style bg-gradient-to-r from-[#4C49ED] to-[#0A06F4]'
            type='submit'
            disabled={loading}
        >
            {loading && (
				<span className='spinner-border spinner-border-sm'></span>
			)}
            <span>{text}</span>
        </button>
    );
}

SubmitButton.propTypes = {
    text: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default SubmitButton;