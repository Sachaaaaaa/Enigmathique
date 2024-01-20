import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MdArrowBackIos} from 'react-icons/md';

const ContentHeader = (props) => {

    const {title, link, children} = props;
    return (
        <nav className='w-full min-w-max flex justify-between gap-8 p-5 pb-0 primary-font-color'>
            <div className='min-w-max flex items-center font-semibold text-lg'>
                <Link to={link} className='p-1'>
                    <MdArrowBackIos size='1em'/>
                </Link>
                <p className='my-auto'>{title}</p>
            </div>
            <div className='flex justify-start gap-8 p-5 pr-0'>
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