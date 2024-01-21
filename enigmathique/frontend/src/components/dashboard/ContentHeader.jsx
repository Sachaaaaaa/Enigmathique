import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MdArrowBackIos} from 'react-icons/md';

const ContentHeader = (props) => {

    const {title, link = '', onClick = {}, children} = props;

    return (
        <nav className='w-full h-max  flex flex-wrap justify-between gap-8 p-5 pb-0 primary-font-color'>
            <div className=' flex items-center font-semibold text-lg'>
                <Link to={link} onClick={onClick} className='p-1'>
                    <MdArrowBackIos size='1em'/>
                </Link>
                <p className='my-auto'>{title}</p>
            </div>
            <div className='grow'></div>
            {children}
        </nav>
    );
}

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

export default ContentHeader;