// ClassElem.jsx
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GameService from '../../services/game.service';
import StudentModel from '../../models/student.model';
import GameModel from "../../models/game.model";
import InfoBlockElem from './InfoBlockElem';
ChartJS.register(...registerables);

const maxTime = 600;

const ClassElem = (props) => {

	const classGroup = props.classGroup;

	const [gamesOf, setGamesOf] = useState([]);
	const [students, setStudents] = useState([]);

	const loadStudents = async () => {
		const data = await StudentModel.getAll(classGroup.id);
		setStudents(data);
	}

	useEffect(() => {
		loadStudents();
	}, []);

	const loadGamesOf = async() => {
		const data = await GameModel.getAll();
		let listGames = [];
		data.forEach((game) => {
			classGroup.id === game.idCourse && listGames.push();
		});
		setGamesOf(listGames);
	}

	useEffect(() => {
		loadGamesOf();
	}, []);

	const getLastGame = (games) => {
		if(games.length !== 0) {
			let maxDate = games[0].createdAt;
			games.forEach((game) => {
				(game.createdAt.localeCompare(maxDate) > 0) && (maxDate = game.createdAt);
			});
			return maxDate;
		} else {
			return 'jamais joué'
		}
	}

	const getWinRate = (games) => {
		let winRate = 0;
		let nbScore;
		if(games.length !== 0) {
			games.forEach((game) => {
				GameService.getScores(game.id).then((response) => {
					const scoreList = response;
					scoreList.forEach((score) => {
						score.time < maxTime && winRate++;
					});
					nbScore = scoreList.length;
				}).catch((error) => {
					console.log(error);
				});
			});
			return Math.floor((winRate / nbScore) * 100);
		} else {
			return 0;
		}
	}


	/*Données de génération du graphique*/
	const data = {
		labels: [''],
		datasets: [
			{
				label: 'Taux de réussite',
				data: [getWinRate(gamesOf)],
				backgroundColor: 'green',
			}
		],
	}

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
	}


	return (
		// Affichage des informations d'une classe
		// Grid pour afficher les informations sur 2 colonnes fixes
		<div className=' info-block grid-block w-full h-[calc(100%-50px)]'>

			<InfoBlockElem title='Nom' text={classGroup.name} />

			<InfoBlockElem title='élèves' text={students.length}/>

			<InfoBlockElem title='nombre de parties jouées' text={gamesOf.length}/>

			<InfoBlockElem title='dernière partie' text={getLastGame(gamesOf)}/>

			{/* Div pour les statistiques */}
			<Bar className='col-span-2 row-span-2' data={data} options={options}/>
			<div className='col-span-2'>
				<p className='text-sm font-semibold'>Taux de
					réussite moyen : {getWinRate(gamesOf)}%</p>
			</div>

			{/* Bouton 'Voir' */}
			<Link to={'/class/'+classGroup.id} className='btn-show col-span-2'>
				Voir
			</Link>
		</div>
	)
}

ClassElem.propTypes = {
	classGroup: PropTypes.object.isRequired
}

export default ClassElem;