// ClassElem.jsx
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GameService from '../../services/game.service';
import StudentModel from 'models/student.model';
import GameModel from 'models/game.model';
import InfoBlockElem from './InfoBlockElem';
import ScoreModel from 'models/score.model';
ChartJS.register(...registerables);

const maxTime = 600;

const ClassElem = ({classGroup}) => {

	const [students, setStudents] = useState([]);
	const [gamesOfClass, setGamesOfClass] = useState([]);
	const [winrate, setWinrate] = useState(0);
	
	const loadData = async() => {
		// Chargement les élèves
		const students = await StudentModel.getAll(classGroup.id);
		setStudents(students);

		// Chargement des parties
		const games = await GameModel.getAll();
		
		// Filtre les parties => celles de la classe
		let listGames = [];
		games.forEach((game) => {
			classGroup.id === game.idCourse && listGames.push(game);
		});
		setGamesOfClass(listGames);

		const getGameData = async(game) => {
			// Chargement des scores
			const scores = await GameModel.getScores(game.id);
			// Filtre les scores => ceux de la classe
			let totalSolved = 0;
			let totalRoom = 0;
			scores.forEach((score) => {
				score.isSolved && totalSolved++; // mdr
				totalRoom++;
			});
			return [totalSolved, totalRoom];
		};

		const calculateWinrate = async() => {
			// getGameData pour toutes les parties
			let totalSolved = 0;
			let totalRoom = 0;
			for (let i = 0; i < listGames.length; i++) {
				const game = listGames[i];
				const [solved, room] = await getGameData(game);
				totalSolved += solved;
				totalRoom += room;
			}

			// Calcul du taux de réussite
			const winrate = Math.round((totalSolved / totalRoom) * 100);
			setWinrate(winrate);
		};
	

		const winrate = await calculateWinrate();
	};

	useEffect(() => {
		loadData();
	}, []);


	/*Données de génération du graphique*/
	const data = {
		labels: [''],
		datasets: [
			{
				label: 'Taux de réussite',
				data: [winrate],
				backgroundColor: 'green',
			}
		],
	};

	const options = {
		barPercentage: 1,
		scales: {
			x: {
				display: false,
				// suggestedMax: 100
			}
		},
		legend: {
			title: {
				display: false
			}
		},
		indexAxis: 'y',
		borderRadius: 20
	};


	return (
		// Affichage des informations d'une classe
		// Grid pour afficher les informations sur 2 colonnes fixes
		<div className=' info-block grid-block w-full'>

			<InfoBlockElem title='Nom' text={classGroup.name} />

			<InfoBlockElem title='élèves' text={students.length}/>

			<InfoBlockElem title='nombre de parties jouées' text={gamesOfClass.length}/>

			<InfoBlockElem title='dernière partie' text={'getLastGame(gamesOfClass)'}/>

			{/* Div pour les statistiques */}
			<Bar className='col-span-2 row-span-2' data={data} options={options}/>
			<div className='col-span-2'>
				<p className='text-sm font-semibold'>Taux de
					réussite moyen : {winrate}%</p>
			</div>

			{/* Bouton 'Voir' */}
			<Link to={'/class/'+classGroup.id} className='btn-show col-span-2'>
				Voir
			</Link>
		</div>
	);
};

ClassElem.propTypes = {
	classGroup: PropTypes.object.isRequired
};

export default ClassElem;