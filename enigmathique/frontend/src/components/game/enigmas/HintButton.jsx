import React from 'react';
import PropTypes from 'prop-types';
import { BsQuestionDiamondFill } from 'react-icons/bs';

const HintButton = ({onClick }) => {
    return (
        <button onClick={onClick} className="hint-button">
            <BsQuestionDiamondFill /> Indice
        </button>
    );
}

HintButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default HintButton;