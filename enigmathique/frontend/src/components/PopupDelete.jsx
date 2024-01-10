import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import '../index.css';
const PopupDelete = (props) => {
	return (
		<Popup trigger={<button className="btn-delete">supprimer l&apos;élève</button>}>
			<div className="bg-white p-2 border-gray-500 border-opacity-100">
				<p>Voulez vous vraiment supprimer l&apos;élève {props.firstname} {props.secondname}</p>
				<div className="flex">
					<button className="btn-cancel">Annuler</button>
					<button className="btn-validate">Valider</button>
				</div>
			</div>
		</Popup>
	);
}

PopupDelete.propTypes = {
	firstname: PropTypes.string.isRequired,
	secondname: PropTypes.string.isRequired,
};

export default PopupDelete;