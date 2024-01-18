// ClassElem.jsx
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GameService from '../../services/game.service';
import Student from '../../models/student.model';
import Game from "../../models/game.model";
ChartJS.register(...registerables);

const maxTime = 600;

const ClassElem = (props) => {

	const classGroup = props.classGroup;

	const [gamesOf, setGamesOf] = useState([]);
	const [students, setStudents] = useState([]);

	const loadStudents = async () => {
		const data = await Student.getAll(classGroup.id);
		setStudents(data);
	}

	useEffect(() => {
		loadStudents();
	}, []);

	const loadGamesOf = async() => {
		const data = await Game.getAll();
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
		<div
			className='grid grid-cols-2 gap-1 info-container w-full'>
			<article className='col-span-1 element-info-container'>
				<h3 className='small-title'>NOM</h3>
				<p className='small-text'>{classGroup.name}</p>
			</article>
			<article className='col-span-1  element-info-container'>
				<h3 className='small-title'>ÉLÈVES</h3>
				<p className='small-text'>{students.length}</p>
			</article>

			<article className='col-span-1  element-info-container'>
				<h3 className='small-title'>NOMBRE DE PARTIES JOUÉES</h3>
				<p className='small-text'>{gamesOf.length}</p>
			</article>

			<article className='col-span-1  element-info-container'>
					<h3 className='small-title'>DERNIÈRE PARTIE</h3>
					<p className='small-text'>{getLastGame(gamesOf)}</p>
			</article>


			{/* Div pour les statistiques */}
			<Bar className='col-span-2 row-span-2' data={data} options={options}/>
			<div className='col-span-2'>
				<p className='text-sm font-semibold'>Taux de
					réussite moyen : {getWinRate(gamesOf)}%</p>
			</div>

			{/* Bouton 'Voir' */}
			<Link to={'/class/'+classGroup.id} className='col-span-2 btn-show'>
				Voir
			</Link>
		</div>
	)
}

ClassElem.propTypes = {
	classGroup: PropTypes.object.isRequired
}

export default ClassElem;