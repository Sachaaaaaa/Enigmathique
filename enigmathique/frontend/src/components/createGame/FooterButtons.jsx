import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const FooterButtons = ({linkRetour, handleRetour, handleSuivant }) => {
    return (
        <article className="grow flex flex-row justify-between items-end w-full h-fit mb-5 px-5">
        <Link
            className='modal-cancel-button-style w-fit px-8 py-6'
            to={linkRetour}
            onClick={handleRetour}
        >
            Retour
        </Link>
        <button
            className='bg-blue-gradient-color modal-validate-button-style w-fit px-8 py-6 border-2 border-blue-color box-border '
            onClick={handleSuivant}
        >
            Suivant
        </button>
    </article>
    )
}

FooterButtons.propTypes = {
    linkRetour: PropTypes.string.isRequired,
    handleRetour: PropTypes.func.isRequired,
    handleSuivant: PropTypes.func.isRequired,
}

export default FooterButtons ;