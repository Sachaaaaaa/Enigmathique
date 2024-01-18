import React from 'react';
import PropTypes from 'prop-types';
import logo from '../assets/img/logo-name-enigmathique.png';
import {Link} from 'react-router-dom';

const AuthHeader = ({ title }) => {
    return (
        <header className='topbar-container flex justify-start h-[75px]'>
            <Link to='/' className='w-[172px] border-r-2 box-border border-[#E6EFF5]'>
				<img src={logo} alt='logo' height={75}/>
			</Link>
            <h1 className='pl-5 primary-font-color text-2xl font-semibold'>{title}</h1>
        </header>
    );
};

AuthHeader.propTypes = {
	title: PropTypes.string.isRequired,
};

export default AuthHeader;
