import React, {useEffect, useState} from 'react';
import LayoutProf from '../layouts/LayoutProf';
import {Link, useParams} from 'react-router-dom';
import GameTeam from '../components/stats/GameTeam';
import ScoreTeam from '../components/stats/ScoreTeam';
import TeamModel from "../models/team.model";
import {FaDoorOpen, FaExclamationCircle, FaLightbulb, FaPuzzlePiece, FaTimes} from "react-icons/fa";
import {Doughnut} from "react-chartjs-2";
import PropTypes from "prop-types";

const TeamStats = ({teamData, onClose, scores}) => {
	const [selectedRoom, setSelectedRoom] = useState('Global');
	const [roomTimers, setRoomTimers] = useState({});
	const [chartData, setChartData] = useState({});
	const [backgroundColorSet, setBackgroundColorSet] = useState([]);
	console.log('teamdaaaaaaaaaatata',teamData);
	console.log('scoressssssssssss', scores);

	const details = selectedRoom === 'Global'
		? {

			indicesUtilises: scores.reduce((acc, score) => acc + score.nbHints, 0),
			erreursCommises: scores.reduce((acc, score) => acc + score.nbBadAnswers, 0),
			sallesReussies: scores.filter(score => score.isSolved).length,
			enigmesResolues: scores.reduce((acc, score) => acc + score.nbGoodAnswers, 0),
		}
		: scores.find(score => score.roomName === selectedRoom);

	useEffect(() => {
		if (scores===undefined) return <p>SIUUUUUUU</p>;
		// Générer un jeu fixe de couleurs lors du premier chargement du composant
		if (scores.length > 0 && backgroundColorSet.length === 0) {
			const generatedColors = scores.map((_, index) => {
				// Exemple de génération de couleur (peut être remplacé par vos propres couleurs)
				return `hsl(${360 * Math.random()}, 70%, 70%)`;
			});
			setBackgroundColorSet(generatedColors);
		}
	}, [scores, backgroundColorSet.length]);


	useEffect(() => {
		if (scores===undefined) return <p>SIUUUUUUU</p>;
		const timers = {};

		scores.forEach(score => {
			setRoomTimers(prevTimers => ({
				...prevTimers,
				[score.roomName]: formatSeconds(score.time)
			}));
		});
		return () => {
			Object.values(timers).forEach(clearInterval);
		};
	}, [scores]);



	useEffect(() => {
		if (scores===undefined) return <p>SIUUUUUUU</p>;
		const chartData = {
			labels: scores.map(score => score.roomName),
			datasets: [{
				label: 'Temps passé dans chaque salle',
				data: scores.map(score=> convertTimeToSeconds(roomTimers[score.roomName])),
				backgroundColor: backgroundColorSet,
				hoverBackgroundColor: backgroundColorSet.map(color => lightenColor(color, 10))
			}]
		};
			setChartData(chartData);
		}, [roomTimers, scores]);



		// Convertir le format hh:mm:ss en secondes
		const convertTimeToSeconds = (timeString) => {

			if (!timeString) return 0;
			const [hours, minutes, seconds] = timeString.split(':').map(Number);
			return hours * 3600 + minutes * 60 + seconds;
		};

		// Fonction pour formater le temps écoulé
		const formatSeconds = s => (new Date(s * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];

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
						{scores.map((score, index) => (
							<div key={index} className="mb-2 flex items-center justify-between">
								<span className="text-gray-500">{score.roomName}</span>
								<span className="font-bold">{roomTimers[score.roomName]}</span>
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
								<select
									id="room-select"
									value={selectedRoom}
									onChange={(e) => setSelectedRoom(e.target.value)}
									className="appearance-none bg-white border border-blue-500 text-blue-600 py-1 px-4 rounded-full shadow-md-sm focus:outline-none">
									<option value="Global">Global</option>
									{scores.map((score) => (
										<option key={score.roomName} value={score.roomName}>{score.roomName}</option>
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
											<p className="text-lg">{details.nbGoodAnswers}</p>
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

TeamStats.propTypes = {
	teamData: PropTypes.object.isRequired,
	scores: PropTypes.array.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default TeamStats;