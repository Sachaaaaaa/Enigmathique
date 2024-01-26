import React from 'react';
import PropTypes from 'prop-types';

// Composant RoomSelector qui permet de sélectionner une salle
const RoomSelector = ({ rooms, selectedRoom, onChange }) => {
	return (
		<div className="relative">
			{/* Sélecteur de salle */}
			<select
				id="room-select"
				value={selectedRoom}
				onChange={onChange}
				className="appearance-none bg-white border border-blue-color blue-font-color w-fit py-1 px-4 pr-6 rounded-full shadow-md-sm focus:outline-none"
			>
				{/* Option pour la vue globale */}
				<option value="Global">Global</option>
				{/* Parcours des salles disponibles pour les ajouter aux options */}
				{rooms.map((room) => (
					<option key={room.roomName} value={room.roomName}>
						{room.roomName}
					</option>
				))}
			</select>
			{/* Icône de flèche pour indiquer la liste déroulante */}
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 blue-font-color">
				<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<path d="M5.5 7l5 5 5-5H5.5z" />
				</svg>
			</div>
		</div>
	);
};

// Définition des propTypes pour les données attendues par le composant
RoomSelector.propTypes = {
	rooms: PropTypes.array,         // Un tableau de salles
	selectedRoom: PropTypes.string,  // La salle actuellement sélectionnée
	onChange: PropTypes.func,        // La fonction à appeler lorsqu'une sélection est modifiée
};

export default RoomSelector;
