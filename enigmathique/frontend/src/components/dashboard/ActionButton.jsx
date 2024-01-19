import React from 'react' ;
import { Link } from 'react-router-dom';
import {IoIosStats} from 'react-icons/io';
import {MdOutlineModeEdit, MdDeleteForever} from 'react-icons/md';
import PropTypes from 'prop-types';

const ActionButton = ({title,link = '', onClick= ''}) => {

    const actionMap = {
        'Statistiques': <IoIosStats size='1.25em'/>,
        'Modifier': <MdOutlineModeEdit size='1.25em'/>,
        'Supprimer': <MdDeleteForever size='1.25em'/>,
        'Classement': <MdDeleteForever size='1.25em'/>,
        'Détails': <MdDeleteForever size='1.25em'/>,
    }
    const icon = actionMap[title];
    return (
        <Link to={link}>
            <button
                title={title}
                onClick={onClick}
                className={"btn-action-"+title+" p-2"}>
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