import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/img/logo-name-enigmathique-black.png';
import {Link} from 'react-router-dom';

/**
 * Entête des pages d'authentification + CGU
 * @param title titre de la page
 * @returns {Element}
 * @constructor
 */
const AuthHeader = ({ title }) => {
    return (
        <header className='topbar-container flex justify-start h-[75px] bg-white'>
            <div className='flex items-center w-fit h-[75px] px-2 pt-2 border-r-2 box-border .border-white-color'>
            <Link to='/' className='w-[172px]'>
				<img src={logo} alt='logo'/>
			</Link>
            </div>
            <h1 className='pl-5 primary-font-color text-2xl font-semibold'>{title}</h1>
        </header>
    );
};

AuthHeader.propTypes = {
	title: PropTypes.string.isRequired,
};

export default AuthHeader;
