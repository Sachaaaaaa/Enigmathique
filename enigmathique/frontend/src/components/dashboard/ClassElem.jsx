// ClassElem.jsx
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import GameService from '../../services/game.service';
import Student from '../../models/student.model';
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

	const loadGamesOf = () => {
		GameService.getAll().then((response) => {
			const games = response;
			let listGames = [];
			games.forEach((game) => {
				classGroup.id === game.idCourse && listGames.put();
			});
			setGamesOf(listGames);
		}).catch((error) => {
			console.log(error);
		});
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


	/*Données de génaration du graphique*/
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
				suggestedMax: 100
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
		<article
			className='grid grid-cols-2 gap-1 info-container min-w-[450px]'>
			<article className='col-span-1 elem-dashboard'>
				<h3 className='small-title'>NOM</h3>
				<p className='small-text'>Seconde {classGroup.name}</p>
			</article>
			<article className='col-span-2  elem-dashboard'>
				<h3 className='small-title'>ÉLÈVES</h3>
				<p className='small-text'>{students.length}</p>
			</article>

			<article>
				<h3 className='small-title'>NOMBRE DE PARTIES JOUÉES</h3>
				<p className='small-text'>{gamesOf.length}</p>
			</article>

			<article>
					<h3 className='small-title'>DERNIÈRE PARTIE</h3>
					<p className='small-text'>{getLastGame(gamesOf)}</p>
			</article>


			{/* Div pour les statistiques */}
			<Bar data={data} options={options}/>
			<div className='px-5 mt-auto'>
				<p className='text-lg font-semibold mb-4'>Taux de
					réussite moyen : {getWinRate(gamesOf)}%</p>
			</div>

			{/* Bouton 'Voir' */}
			<Link to={'../class/'+classGroup.id} className='btn-show'>
				Voir
			</Link>
		</article>
	)
}

ClassElem.propTypes = {
	classGroup: PropTypes.object.isRequired
}

export default ClassElem;