import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaLightbulb, FaExclamationCircle, FaCheckCircle, FaPuzzlePiece, FaDoorOpen } from 'react-icons/fa';

function TeamDetails({ teamData, onClose }) {
	const [selectedRoom, setSelectedRoom] = useState('Global');

	const details = selectedRoom === 'Global'
		? {
			indicesUtilises: teamData.rooms.reduce((acc, room) => acc + room.numHints, 0),
			erreursCommises: teamData.rooms.reduce((acc, room) => acc + room.numBadAnswers, 0),
			sallesReussies: teamData.rooms.filter(room => room.isSolved).length,
			enigmesResolues: teamData.rooms.reduce((acc, room) => acc + room.numSolved, 0),
		}
		: teamData.rooms.find(room => room.name === selectedRoom);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white w-full max-w-2xl mx-auto rounded-lg shadow-md-xl overflow-hidden">
				<div className="flex justify-between items-center border-b p-5">
					<h2 className="text-2xl font-bold">{teamData.teamName}</h2>
					<button onClick={onClose} className="text-black text-2xl">
						<FaTimes />
					</button>
				</div>
				<div className="p-5">
					<div className="mb-4 flex items-center justify-between">
						<label htmlFor="room-select" className="font-semibold text-gray-500">Détails :</label>
						<div className="relative">
							<select id="room-select" value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} 
								className="appearance-none bg-white border border-blue-500 text-blue-600 py-1 px-4 rounded-full shadow-md-sm focus:outline-none">
								<option value="Global">Global</option>
								{teamData.rooms.map((room) => (
									<option key={room.name} value={room.name}>{room.name}</option>
								))}
							</select>
							<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-500">
								<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M5.5 7l5 5 5-5H5.5z" />
								</svg>
							</div>
						</div>
					</div>
					<div className="space-y-2">
						{selectedRoom === 'Global' ? (
							<>
								<div className="flex items-center">
									<div className="p-4 rounded-full bg-yellow-100">
										<FaLightbulb className="text-yellow-500 text-3xl" />
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-500">Indices utilisés</p>
										<p className="text-lg">{details.indicesUtilises}</p>
									</div>
								</div>

								<div className="flex items-center">
									<div className="p-4 rounded-full bg-red-100">
										<FaExclamationCircle className="text-red-500 text-3xl" />
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-500">Erreurs commises</p>
										<p className="text-lg">{details.erreursCommises}</p>
									</div>
								</div>

								<div className="flex items-center">
									<div className="p-4 rounded-full bg-blue-100">
										<FaDoorOpen className="text-blue-500 text-3xl" />
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-500">Salles réussies</p>
										<p className="text-lg">{details.sallesReussies}</p>
									</div>
								</div>
							</>
						): (
							<>
								<div className="flex items-center">
									<div className="p-4 rounded-full bg-yellow-100">
										<FaLightbulb className="text-yellow-500 text-3xl" />
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-500">Indices utilisés</p>
										<p className="text-lg">{details.numHints}</p>
									</div>
								</div>

								<div className="flex items-center">
									<div className="p-4 rounded-full bg-red-100">
										<FaExclamationCircle className="text-red-500 text-3xl" />
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-500">Erreurs commises</p>
										<p className="text-lg">{details.numBadAnswers}</p>
									</div>
								</div>
						
								<div className="flex items-center">
									<div className="p-4 rounded-full bg-blue-100">
										<FaDoorOpen className="text-blue-500 text-3xl" />
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-500">Salles réussies</p>
										<p className="text-lg">{details.isSolved}</p>
									</div>
								</div>
								<div className="flex items-center">
									<div className="p-4 rounded-full bg-green-100">
										<FaPuzzlePiece className="text-green-500 text-3xl" />
									</div>
									<div className="ml-3">
										<p className="text-sm text-gray-500">Énigmes résolues</p>
										<p className="text-lg">{details.numSolved}</p>
									</div>
								</div>
							</>
							
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

TeamDetails.propTypes = {
	teamData: PropTypes.shape({
		teamName: PropTypes.string.isRequired,
		rooms: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				numHints: PropTypes.number.isRequired,
				numBadAnswers: PropTypes.number.isRequired,
				numSolved: PropTypes.number.isRequired,
				isSolved: PropTypes.bool.isRequired
			})
		).isRequired
	}).isRequired,
	onClose: PropTypes.func.isRequired
};

export default TeamDetails;



