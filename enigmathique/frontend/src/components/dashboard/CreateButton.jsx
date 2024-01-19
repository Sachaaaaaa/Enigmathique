import React from 'react';
import PropTypes from 'prop-types';
import {FaPlus} from 'react-icons/fa';

const CreateButton = ({title, onClick}) => {
    return (
        <button
        className="btn-utils btn-utils-create"
        onClick={onClick}><FaPlus/><p>{title}</p>
    </button>
    ) 
}

CreateButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default CreateButton;