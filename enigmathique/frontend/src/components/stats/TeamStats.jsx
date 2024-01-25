import React, {useEffect, useState} from 'react';
import LayoutProf from '../../layouts/LayoutProf';
import {Link, useParams} from 'react-router-dom';
import GameTeam from './GameTeam';
import ScoreTeam from './ScoreTeam';
import TeamModel from "../../models/team.model";
import {FaDoorOpen, FaExclamationCircle, FaLightbulb, FaPuzzlePiece, FaTimes} from "react-icons/fa";
import {Doughnut} from "react-chartjs-2";
import PropTypes from "prop-types";
import ItemStats from "./ItemStats";
import RoomSelector from "components/stats/RoomSelector";
import { SpriteAnimator } from '@react-three/drei';

const TeamStats = ({teamData, onClose, scores}) => {
	const [selectedRoom, setSelectedRoom] = useState('Global');
	const [roomTimers, setRoomTimers] = useState({});
	const [chartData, setChartData] = useState({});
	const [backgroundColorSet, setBackgroundColorSet] = useState([]);

	const details = selectedRoom === 'Global'
		? {
			indicesUtilises: scores.reduce((acc, score) => acc + score.nbHints, 0),
			erreursCommises: scores.reduce((acc, score) => acc + score.nbBadAnswers, 0),
			sallesReussies: scores.filter(score => score.isSolved).length,
			enigmesResolues: scores.reduce((acc, score) => acc + score.nbGoodAnswers, 0),
		}
		: scores.find(score => score.roomName === selectedRoom);

	useEffect(() => {
		if (scores===undefined) return <p>Loading..</p>;
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
		if (scores===undefined) return <p>Loading..</p>;
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
		if (scores===undefined) return <p>Loading..</p>;
		const chartData = {
			labels: scores.map(score => score.roomName),
			datasets: [{
				label: 'Temps passé dans chaque salle',
				data: scores.map(score=> convertTimeToSeconds(roomTimers[score.roomName])),//score.time
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
		<div className="team-stats-screen">
			<div className="team-stats-container">
				<div className="flex items-center gap-10 border-b p-5">
					<h2 className="text-2xl font-bold">{teamData.name}</h2>
					<div className='grow flex flex-col'>
						{teamData.members.map((student,index)=><p key={index}> {student.firstname +' '+student.lastname} </p>)}
					</div>
					<button onClick={onClose} className="text-[#EF4565] text-2xl">
						<FaTimes />
					</button>
				</div>
				<div className="p-5 flex">
					{/* Left side - Temps de jeu */}
					<div className="w-1/2 pr-4">
						<h3 className="text-xl font-semibold mb-4">Temps de jeu :</h3>
						{scores.map((score, index) => (
							<div key={index} className="mb-2 flex items-center justify-between">
								<span>{score.roomName}</span>
								<span className="font-bold">{roomTimers[score.roomName]}</span>
							</div>
						))}
						{/* Graphique en beignet */}
						{chartData.labels && <Doughnut data={chartData} />}
					</div>


					{/* Right side - Temps de jeu */}
					<div className="w-1/2 pl-4 border-l">
						<div className="mb-4 flex items-center justify-between">
							<label htmlFor="room-select" className="text-xl font-semibold">Détails :</label>
							<RoomSelector rooms={scores} selectedRoom={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)}/>
						</div>
						<div className="space-y-2 flex flex-col gap-3">
							{selectedRoom === 'Global' ? (
								<>
									<ItemStats logo='indices' text='Indices utilisés' value={details.indicesUtilises} color='yellow'/>
									<ItemStats logo='erreurs' text='Erreurs commises' value={details.erreursCommises} color='red'/>
									<ItemStats logo='sallesReussies' text='Salles réussies' value={details.sallesReussies} color='blue'/>
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

TeamStats.propTypes = {
	teamData: PropTypes.object,
	scores: PropTypes.array,
	onClose: PropTypes.func,
};

export default TeamStats;