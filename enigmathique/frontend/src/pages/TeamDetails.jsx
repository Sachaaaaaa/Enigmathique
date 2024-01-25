import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaLightbulb, FaExclamationCircle, FaPuzzlePiece, FaDoorOpen } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import RoomSelector from 'components/stats/RoomSelector';
import ItemStats from 'components/stats/ItemStats';

function TeamDetails({ teamData,teamName, onClose}) {
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
		: teamData.rooms.find(room => room.roomName === selectedRoom);
	
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

			timers[room.roomName] = setInterval(() => {
				if (!endTime) {
					endTime = new Date().getTime();
				}
				const elapsedTime = endTime - startTime;
				setRoomTimers(prevTimers => ({
					...prevTimers,
					[room.roomName]: formatElapsedTime(elapsedTime)
				}));
			}, 1000);
		});

		return () => {
			Object.values(timers).forEach(clearInterval);
		};
	}, [teamData.rooms]);

	useEffect(() => {

		const chartData = {
			labels: teamData.rooms.map(room => room.roomName),
			datasets: [{
				label: 'Temps passé dans chaque salle',
				data: teamData.rooms.map(room => convertTimeToSeconds(roomTimers[room.roomName])),
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
		<div className="team-stats-screen">
			<div className="team-stats-container">
				<div className="flex justify-between items-center border-b p-5">
					<h2 className="text-2xl font-bold">{teamName}</h2>
					<button onClick={onClose} className="text-[#EF4565] text-2xl">
						<FaTimes />
					</button>
				</div>
				<div className="p-5 flex">
					{/* Left side - Temps de jeu */}
					<div className="w-1/2 pr-4">
						<h3 className="text-xl font-semibold mb-4">Temps de jeu :</h3>
						{teamData.rooms.map((room, index) => (
							<div key={index} className="mb-2 flex items-center justify-between">
								<span>{room.roomName}</span>
								<span className="font-bold">{roomTimers[room.roomName]}</span>
							</div>
						))}
						{/* Graphique en beignet */}
						{chartData.labels && <Doughnut data={chartData} />}
					</div>


					{/* Right side - Temps de jeu */}
					<div className="w-1/2 pl-4 border-l">
						<div className="mb-4 flex items-center justify-between">
							<label htmlFor="room-select" className="text-xl font-semibold mb-4">Détails :</label>
							<RoomSelector rooms={teamData.rooms} selectedRoom={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}/>
						</div>
						<div className="space-y-2 flex flex-col gap-3">
						{selectedRoom === 'Global' ? (
								<>
									<ItemStats logo='indices' text='Indices utilisés' value={details.indicesUtilises} color='yellow'/>
									<ItemStats logo='erreurs' text='Erreurs commises' value={details.erreursCommises} color='red'/>
									<ItemStats logo='sallesReussies' text='Salles réussies' value={details.sallesReussies} color='blue'/>
									<ItemStats logo='enigmesResolues' text='Énigmes résolues' value={details.enigmesResolues} color='green'/>
								</>
							): (
								<>
									<ItemStats logo='indices' text='Indices utilisés' value={details.nbHints} color='yellow'/>
									<ItemStats logo='erreurs' text='Erreurs commises' value={details.nbBadAnswers} color='red'/>
									<ItemStats logo='sallesReussies' text='Salle réussie' value={details.isSolved ? 'Oui' : 'Non'} color='blue'/>
									<ItemStats logo='enigmesResolues' text='Énigmes résolues' value={details.nbGoodAnswers} color='green'/>
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
	teamName: PropTypes.string.isRequired,
};

export default TeamDetails;



