import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ text, loading }) => {
    return (
        <button
            className='w-full bg-[#0A06F4] hover:bg-blue-700 text-white font-bold mt-2 py-2 rounded focus:outline-none'
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