import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaLightbulb, FaExclamationCircle, FaPuzzlePiece, FaDoorOpen } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';

function TeamDetails({ teamData, onClose}) {
	const [selectedRoom, setSelectedRoom] = useState('Global');
	const [roomTimers, setRoomTimers] = useState({});
	const [chartData, setChartData] = useState({});
	const [backgroundColorSet, setBackgroundColorSet] = useState([]);

	const details = selectedRoom === 'Global'
		? {
			indicesUtilises: teamData.rooms.reduce((acc, room) => acc + room.nbHints, 0),
			erreursCommises: teamData.rooms.reduce((acc, room) => acc + room.nbBadAnswers, 0),
			sallesReussies: teamData.rooms.filter(room => room.isSolved).length,
			enigmesResolues: teamData.rooms.reduce((acc, room) => acc + room.nbGoodAnswers, 0),
		}
		: teamData.rooms.find(room => room.name === selectedRoom);
	
	useEffect(() => {
		// Générer un jeu fixe de couleurs lors du premier chargement du composant
		if (teamData.rooms.length > 0 && backgroundColorSet.length === 0) {
			const generatedColors = teamData.rooms.map((_, index) => {
				// Exemple de génération de couleur (peut être remplacé par vos propres couleurs)
				return `hsl(${360 * Math.random()}, 70%, 70%)`;
			});
			setBackgroundColorSet(generatedColors);
		}
	}, [teamData.rooms, backgroundColorSet.length]);

	useEffect(() => {
		const timers = {};

		teamData.rooms.forEach(room => {
			const startTime = new Date(room.startTime).getTime();
			let endTime = room.endTime ? new Date(room.endTime).getTime() : null;

			timers[room.name] = setInterval(() => {
				if (!endTime) {
					endTime = new Date().getTime();
				}
				const elapsedTime = endTime - startTime;
				setRoomTimers(prevTimers => ({
					...prevTimers,
					[room.name]: formatElapsedTime(elapsedTime)
				}));
			}, 1000);
		});

		return () => {
			Object.values(timers).forEach(clearInterval);
		};
	}, [teamData.rooms]);

	useEffect(() => {

		const chartData = {
			labels: teamData.rooms.map(room => room.name),
			datasets: [{
				label: 'Temps passé dans chaque salle',
				data: teamData.rooms.map(room => convertTimeToSeconds(roomTimers[room.name])),
				backgroundColor: backgroundColorSet,
				hoverBackgroundColor: backgroundColorSet.map(color => lightenColor(color, 10))
			}]
		};

		setChartData(chartData);
	}, [roomTimers, teamData.rooms]);


	// Convertir le format hh:mm:ss en secondes
	const convertTimeToSeconds = (timeString) => {
		if (!timeString) return 0;
		const [hours, minutes, seconds] = timeString.split(':').map(Number);
		return hours * 3600 + minutes * 60 + seconds;
	};

	// Fonction pour formater le temps écoulé
	const formatElapsedTime = (elapsedTime) => {
		const totalSeconds = Math.floor(elapsedTime / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		return [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');
	};

	// Fonction pour éclaircir la couleur
	const lightenColor = (color, percent) => {
		// Extraire la teinte, la saturation et la luminosité depuis la couleur HSL
		let [hue, saturation, lightness] = color.match(/\d+/g).map(Number);

		// Augmenter la luminosité par le pourcentage donné
		lightness = Math.min(100, lightness + percent);

		// Retourner la nouvelle couleur en format HSL
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	};


	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white w-full max-w-2xl mx-auto rounded-lg shadow-md-xl overflow-hidden">
				<div className="flex justify-between items-center border-b p-5">
					<h2 className="text-2xl font-bold">{teamData.teamName}</h2>
					<button onClick={onClose} className="text-black text-2xl">
						<FaTimes />
					</button>
				</div>
				<div className="p-5 flex">
					{/* Left side - Temps de jeu */}
					<div className="w-1/2 pr-4">
						<h3 className="text-xl font-semibold mb-4 text-gray-500">Temps de jeu :</h3>
						{teamData.rooms.map((room, index) => (
							<div key={index} className="mb-2 flex items-center justify-between">
								<span className="text-gray-500">{room.name}</span>
								<span className="font-bold">{roomTimers[room.name]}</span>
							</div>
						))}
						{/* Graphique en beignet */}
						{chartData.labels && <Doughnut data={chartData} />}
					</div>


					{/* Right side - Temps de jeu */}
					<div className="w-1/2 pl-4 border-l">
						<div className="mb-4 flex items-center justify-between">
							<label htmlFor="room-select" className="text-xl font-semibold mb-4 text-gray-500">Détails :</label>
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

									<div className="flex items-center">
										<div className="p-4 rounded-full bg-green-100">
											<FaPuzzlePiece className="text-green-500 text-3xl" />
										</div>
										<div className="ml-3">
											<p className="text-sm text-gray-500">Énigmes résolues</p>
											<p className="text-lg">{details.enigmesResolues}</p>
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
											<p className="text-lg">{details.nbHints}</p>
										</div>
									</div>

									<div className="flex items-center">
										<div className="p-4 rounded-full bg-red-100">
											<FaExclamationCircle className="text-red-500 text-3xl" />
										</div>
										<div className="ml-3">
											<p className="text-sm text-gray-500">Erreurs commises</p>
											<p className="text-lg">{details.nbBadAnswers}</p>
										</div>
									</div>
						
									<div className="flex items-center">
										<div className="p-4 rounded-full bg-blue-100">
											<FaDoorOpen className="text-blue-500 text-3xl" />
										</div>
										<div className="ml-3">
											<p className="text-sm text-gray-500">Salle réussie</p>
											{/* // affiché si la salle est résolue ou non */}
											<p className="text-lg">{details.isSolved ? 'Oui' : 'Non'}</p>
										</div>
									</div>
									<div className="flex items-center">
										<div className="p-4 rounded-full bg-green-100">
											<FaPuzzlePiece className="text-green-500 text-3xl" />
										</div>
										<div className="ml-3">
											<p className="text-sm text-gray-500">Énigmes résolues</p>
											<p className="text-lg">{details.nbGoodAnswers}</p>
										</div>
									</div>
								</>
						
							)}
						</div>
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
				nbHints: PropTypes.number.isRequired,
				nbBadAnswers: PropTypes.number.isRequired,
				nbGoodAnswers: PropTypes.number.isRequired,
				isSolved: PropTypes.bool.isRequired
			})
		).isRequired,
		startTime: PropTypes.string.isRequired,
		endTime: PropTypes.string.isRequired,
	}).isRequired,
	onClose: PropTypes.func.isRequired,
};

export default TeamDetails;



