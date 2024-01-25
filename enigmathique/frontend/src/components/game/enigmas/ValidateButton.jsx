import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';

const ValidateButton = ({ onClick }) => {
    return <button onClick={onClick} className="validate-button">
				<FaCheck /> Valider
			</button>
}

ValidateButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default ValidateButton;