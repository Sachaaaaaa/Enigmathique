import React from 'react' ;
import { Link } from 'react-router-dom';
import {IoIosStats} from 'react-icons/io';
import {FaRankingStar} from "react-icons/fa6";
import { FiInfo } from "react-icons/fi";
import {MdOutlineModeEdit, MdDeleteForever} from 'react-icons/md';
import PropTypes from 'prop-types';

const ActionButton = ({title,link = '', onClick= () => {}}) => {

    // const actionMap = {
    //     'Statistiques': <IoIosStats size='1.25em'/>,
    //     'Modifier': <MdOutlineModeEdit size='1.25em'/>,
    //     'Supprimer': <MdDeleteForever size='1.25em'/>,
    //     'Classement': <FaRankingStar size='1.25em'/>,
    //     'Détails': <FiInfo size='1.25em'/>,
    // }
    const actionButtons = {
        statistiques: {
            icon: <IoIosStats size='1.25em'/>,
            className: "btn-action-Statistiques p-2",
        },
        modifier: {
            icon: <MdOutlineModeEdit size='1.25em'/>,
            className: "btn-action-Modifier p-2",
        },
        supprimer: {
            icon: <MdDeleteForever size='1.25em'/>,
            className: "btn-action-Supprimer p-2",
        },
        classement: {
            icon: <FaRankingStar size='1.25em'/>,
            className: "btn-action-Classement p-2",
        },
        détails: {
            icon: <FiInfo size='1.25em'/>,
            className: "btn-action-Détails p-2",
        },
    }

    const buttonTitle = title.toLowerCase();


    const icon = actionButtons[buttonTitle].icon;
    const className = actionButtons[buttonTitle].className;
    return (
        <Link to={link}>
            <button
                title={title}
                onClick={onClick}
                className={className}>
                {icon}
            </button>
        </Link>
    ) 
}

ActionButton.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    onClick: PropTypes.func,
}

export default ActionButton;