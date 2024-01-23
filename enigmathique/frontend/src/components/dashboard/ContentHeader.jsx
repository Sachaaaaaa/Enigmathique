import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {MdArrowBackIos} from 'react-icons/md';
import { BiLeftArrowAlt } from "react-icons/bi";

const btnTitleMap = {
    "/dashboard" : "Tableau de bord",
    "/class" : "Mes classes",
    "/games" : "Mes parties",
    "/rooms" : "Salles d'énigmes",
    "" : "Paramètres de partie",
}


const ContentHeader = (props) => {

    const {title = "", link = '', onClick = () => {}, children} = props;

    const btnTitle = btnTitleMap[link];

    return (
        <nav className='w-full h-max  flex flex-wrap justify-between gap-8 p-5 pb-0 primary-font-color'>
            <div className=' flex items-center font-semibold text-lg'>
                <Link to={link} onClick={onClick}>
                    <button title={btnTitle}  className='p-1 pr-10'>
                    <BiLeftArrowAlt size='1.5em'/>
                    </button>
                </Link>
                <p className='my-auto'>{title}</p>
            </div>
            <div className='grow'></div>
            {children}
        </nav>
    );
}

ContentHeader.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
};

export default ContentHeader;