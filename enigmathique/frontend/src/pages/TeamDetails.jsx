import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TeamDetails({ teamData, onClose, data }) {
	const [selectedRoom, setSelectedRoom] = useState('');

	const handleRoomChange = (e) => {
		setSelectedRoom(e.target.value);
	};

	const roomDetails = selectedRoom && data.teams[teamData.id] ? data.teams[teamData.id].find(room => room.name === selectedRoom) : null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="modal-overlay absolute inset-0 bg-black opacity-50"></div>
			<div className="modal-container bg-white w-full md:max-w-3xl mx-auto rounded shadow-lg z-50 overflow-y-auto">
				<div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50" onClick={onClose}>
					<svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
						<path d="M6.293 6.293a1 1 0 011.414 0L9 7.586l1.293-1.293a1 1 0 111.414 1.414L10.414 9l1.293 1.293a1 1 0 11-1.414 1.414L9 10.414l-1.293 1.293a1 1 0 01-1.414-1.414L7.586 9 6.293 7.707a1 1 0 010-1.414z"></path>
					</svg>
                    Fermer
				</div>

				<div className="modal-content py-4 text-left px-6">
					<h2 className="text-xl font-semibold">{teamData.teamName}</h2>
					<div className="mb-4">Indices utilisés : {teamData.numHint}</div>
					<div className="mb-4">Erreurs commises : {teamData.numBadAnswer}</div>
					<div className="mb-4">
						<h3 className="font-semibold">Temps de jeu</h3>
						<p>{teamData.playTime}</p>
					</div>
					<div className="mb-4">
						<h3 className="font-semibold">Score</h3>
						<p>{teamData.score}</p>
					</div>
					<div className="mb-4">
						<h3 className="font-semibold">Salles réussies</h3>
						<p>{teamData.resolved}</p>
					</div>

					<div className="mb-4">
						<label htmlFor="room-select" className="font-semibold">Choisir une Salle :</label>
						<select id="room-select" value={selectedRoom} onChange={handleRoomChange} className="ml-2">
							<option value="">Sélectionnez une salle</option>
							{data.metadata.rooms.map(room => (
								<option key={room} value={room}>{room}</option>
							))}
						</select>
					</div>

					{selectedRoom && roomDetails && (
						<div>
							<h3 className="font-semibold">Détails de la Salle {selectedRoom}</h3>
							<p>Erreurs commises : {roomDetails.numBadAnswers}</p>
							<p>Indices utilisés : {roomDetails.numHints}</p>
							{/* ... Autres détails de la salle ... */}
						</div>
					)}

					<div className="mb-4">
						<button onClick={() => setSelectedRoom('global')} className="text-blue-600 hover:text-blue-800">
                            Voir les Détails Globaux
						</button>
					</div>

					{selectedRoom === 'global' && (
						<div>
							<h3 className="font-semibold">Détails Globaux</h3>
							{/* Afficher les détails globaux ici */}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

TeamDetails.propTypes = {
	teamData: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		teamName: PropTypes.string,
		numHint: PropTypes.number,
		numBadAnswer: PropTypes.number,
		playTime: PropTypes.string,
		score: PropTypes.number,
		resolved: PropTypes.string,
	}).isRequired,
	onClose: PropTypes.func.isRequired,
	data: PropTypes.object, // Ajout de la nouvelle prop 'data'
};

export default TeamDetails;
