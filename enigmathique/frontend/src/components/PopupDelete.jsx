import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import '../index.css';
import { MdDeleteForever } from "react-icons/md";

const PopupDelete = (props) => {
	return (
		<Popup trigger={<button className="btn-delete"><MdDeleteForever/> </button>}>
			<div className="bg-white p-2 h-500 w-500 border-gray-500 border-opacity-100">
				<p>Voulez vous vraiment supprimer {props.type === "class"? "la classe " + props.name : "l'élève " +props.firstname +" "+ props.secondname}</p>
				<div className="flex">
					<button className="btn-cancel">Annuler</button>
					<button className="btn-validate">Valider</button>
				</div>
			</div>
		</Popup>
	);
}

PopupDelete.propTypes = {
	firstname: PropTypes.string,
	secondname: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
};

export default PopupDelete;