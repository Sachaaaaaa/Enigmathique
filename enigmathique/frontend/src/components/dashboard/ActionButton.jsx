import React from 'react' ;
import { Link } from 'react-router-dom';
import {IoIosStats} from 'react-icons/io';
import {FaRankingStar} from "react-icons/fa6";
import { FaCheck } from 'react-icons/fa';
import { FiInfo } from "react-icons/fi";
import {MdOutlineModeEdit, MdDeleteForever, MdOutlineRemove} from 'react-icons/md';
import PropTypes from 'prop-types';

const ActionButton = ({title,link = '', onClick= () => {}, disabled=false}) => {

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
            className: "btn-action-statistiques p-2",
        },
        modifier: {
            icon: <MdOutlineModeEdit size='1.25em'/>,
            className: "btn-action-modifier p-2",
        },
        supprimer: {
            icon: <MdDeleteForever size='1.25em'/>,
            className: "btn-action-supprimer p-2",
        },
        classement: {
            icon: <FaRankingStar size='1.25em'/>,
            className: "btn-action-classement p-2",
        },
        détails: {
            icon: <FiInfo size='1.25em'/>,
            className: "btn-action-détails p-2",
        },
        valider: {
            icon: <FaCheck size='1em'/>,
            className: "btn-action-valider p-2",
        },
        refuser : {
            icon: <MdOutlineRemove size='1em'/>,
            className: "btn-action-refuser p-2",
        },

    }

    const buttonTitle = title.toLowerCase();


    const icon = actionButtons[buttonTitle].icon;
    const className = disabled ? "btn-disabled p-2" : actionButtons[buttonTitle].className;
    return (
            <Link to={link}>
                <button
                    title={title}
                    onClick={onClick}
                    className={className}
                    disabled={disabled}>
                    {icon}
                </button>
            </Link>
    ) 
}

ActionButton.propTypes = {
    title: PropTypes.string.isRequired,
    link: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}

export default ActionButton;