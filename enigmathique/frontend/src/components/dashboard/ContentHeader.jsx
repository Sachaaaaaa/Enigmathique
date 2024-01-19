import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MdArrowBackIos} from 'react-icons/md';
import SearchInput from 'components/SearchInput';

const ContentHeader = (props) => {

    const {title, link, children} = props;
    return (
        <nav className='flex flex-row flex-grow justify-between w-full p-5 primary-font-color'>
            <div className='flex items-center font-semibold text-lg'>
                <Link to={link} className='m-auto p-1'>
                    <MdArrowBackIos size='1em'/>
                </Link>
                <p className='my-auto'>{title}</p>
            </div>
            {children}
        </nav>
    );
}

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default ContentHeader;