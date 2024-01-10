import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";

const PopupDelete = (props) => {
	return (
		<Popup trigger={<button>trigger</button>}>
			<div className="bg-white">
				<p>Voulez vous vraiment supprimer l&apos;élève {props.firstname} {props.secondname}</p>
				<div className="flex">
					<button
						className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-50"
						type="submit">
						Annuler
					</button>
					<button
						className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-50"
						type="submit">
						valider
					</button>
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