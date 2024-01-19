import {Link} from 'react-router-dom';
import React, {useEffect, useState, useTransition} from 'react';
import PropTypes from 'prop-types';
import TeamService from "../../services/team.service";
import Game from "../../models/game.model";
import Course from "../../models/course.model";
import useCourses from "../../hooks/useCourses";
import useTeams from "../../hooks/useTeams";
import TeamModel from "../../models/team.model";
import useCourse from "../../hooks/useCourse";

const maxTime = 600;

const GameElem = (props) => {

	const game = props.game;

	const [scores, setScores] = useState([]);
	const [course, loadCourse] = useCourse(game.idCourse);



	const loadScores = async () => {
		const data = await Game.getScores(game.id);
		console.log(data);
		setScores(data);
	}

	/**
	const loadScores = async () => {
		const data = await Game.getScores(game.id);
		data===1? setScores(data): console.log('pas de score disponible');
	}*/


	useEffect(() => {
		loadScores();
	}, []);


	const getWinners = () => {
		let maxScore= scores[0];
		let winners=  [];
		scores.forEach((score) => {
			if((score.time < maxTime ? 500 : 0)+(score.nbGoodAnswers*100)-(score.nbHints*20)-(score.nbBadAnswers*10)>maxScore) {
				maxScore = score;
			}
		});
		TeamService.getStudents(maxScore.id).then((response) => {
			winners=response;
		}).catch((error) => {
			console.log(error);
		});
		return winners;
	}

	const getWinRate = () => {
		let winRate = 0;
		const nbScore = scores.length;
		if(scores.length !== 0) {
			scores.forEach((score) => {
				score.time < maxTime && winRate++;
			});
			return Math.floor((winRate / nbScore) * 100);
		} else {
			return 0;
		}
	}

	return (
		<article className='grid grid-cols-2 gap-1 info-container'>
			<article className='col-span-2 pt-2 element-info-container'>
				<h3 className='small-title'>Nom</h3>
				<p className='small-text'>{game.name}</p>
			</article>
			<article className='col-span-1 element-info-container'>
				<h3 className='small-title'>Classe</h3>
				<p className='small-text'>{course.name}</p>
			</article>
			<article className='col-span-1 element-info-container'>
				<h3 className='small-title'>Date</h3>
				<p className='small-text'>{game.createdAt.toLocaleString()}</p>
			</article>
			<article className='col-span-1 element-info-container'>
				<h3 className='small-title'>Gagnants</h3>
				<p className='small-text'>{game.state !== 2 ? 'Partie non terminée' : console.log("non")
					//getWinners().map((stud) => {`${stud.firstname} ${stud.lastname} `})
					}</p>
			</article>
			<article className='col-span-1 element-info-container'>
				<h3 className='small-title'>Taux de réussite</h3>
				<p className='small-text'>{getWinRate()} %</p>
			</article>
			<Link to='' className='col-span-2 btn-show'>
				Voir
			</Link>
		</article>
	)
}

GameElem.propTypes = {
	game: PropTypes.object.isRequired
}

export default GameElem;