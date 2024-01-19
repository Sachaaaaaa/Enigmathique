import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MdArrowBackIos} from 'react-icons/md';

const ContentHeader = (props) => {

    const {title, link, children} = props;
    return (
        <nav className='flex flex-row flex-grow justify-between w-full p-5 pb-0 primary-font-color'>
            <div className='flex items-center font-semibold text-lg'>
                <Link to={link} className='m-auto p-1'>
                    <MdArrowBackIos size='1em'/>
                </Link>
                <p className='my-auto'>{title}</p>
            </div>
            <div className='flex justify-end gap-3 p-5 pr-0'>
            {children}
            </div>
        </nav>
    );
}

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default ContentHeader;