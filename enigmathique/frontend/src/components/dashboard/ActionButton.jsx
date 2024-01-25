import React from 'react' ;
import { Link } from 'react-router-dom';
import {IoIosStats} from 'react-icons/io';
import {FaRankingStar} from "react-icons/fa6";
import { FaCheck } from 'react-icons/fa';
import { FiInfo } from "react-icons/fi";
import {MdOutlineModeEdit, MdDeleteForever, MdOutlineRemove} from 'react-icons/md';
import { HiPlay } from "react-icons/hi2";
import PropTypes from 'prop-types';
import { IoMdRemove } from "react-icons/io";
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
            className: "btn-action-blue",
        },
        modifier: {
            icon: <MdOutlineModeEdit size='1.25em'/>,
            className: "btn-action-orange",
        },
        supprimer: {
            icon: <MdDeleteForever size='1.25em'/>,
            className: "btn-action-red",
        },
        classement: {
            icon: <FaRankingStar size='1.25em'/>,
            className: "btn-action-yellow",
        },
        lancer : {
            icon: <HiPlay size='1.25em'/>,
            className: "btn-action-blue",
        },
        détails: {
            icon: <FiInfo size='1.25em'/>,
            className: "btn-action-blue",
        },
        valider: {
            icon: <FaCheck size='1em'/>,
            className: "btn-action-green",
        },
        refuser : {
            icon: <IoMdRemove size='1em'/>,
            className: "btn-action-red",
        },
        règles: {
            icon: <FiInfo size='1.25em'/>,
            className: "btn-action-blue absolute bottom-0 right-0 m-4 w-16 h-16 z-50",
        },

    }

    const buttonTitle = title.toLowerCase();


    const icon = actionButtons[buttonTitle].icon;
    const className = disabled ? "btn-disabled" : actionButtons[buttonTitle].className;
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