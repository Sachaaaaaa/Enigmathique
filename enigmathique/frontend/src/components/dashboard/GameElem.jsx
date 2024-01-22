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
import InfoBlockElem from "./InfoBlockElem";
import ScoreTeam from "../stats/ScoreTeam";

const maxTime = 600;

const GameElem = (props) => {

	const game = props.game;

	const [scores, setScores] = useState([]);
	const [course, loadCourse] = useCourse(game.idCourse);
	const [winners, setWinners] = useState([]);


	
	
	const fetchData = async () => {
		try {
			const scoresData = await Game.getScores(game.id);
			setScores(scoresData);
			getWinners(scoresData)
		}catch (e) {
			console.log('erreur fetchData',e);
		}
	}
	
	useEffect(() => {
		fetchData();
	}, []);
	
	
	/**
	 * Retourne la team gagnante de la partie
	 * @param scoresData
	 * @returns {*}
	 */
	const getWinners = async (scoresData) => {
		try {
			let maxScore = scoresData==null ?scores[0] : scoresData[0];
			
			const scoreTeam = new Map();
			
			
			scores.forEach((score) => {
				const firstScore = (maxScore.time < maxTime ? 500 : 0) +
					(maxScore.nbGoodAnswers * 100) -
					(maxScore.nbHints * 20) -
					(maxScore.nbBadAnswers * 10);
				const calculatedScore = (score.time < maxTime ? 500 : 0) +
					(score.nbGoodAnswers * 100) -
					(score.nbHints * 20) -
					(score.nbBadAnswers * 10);
				addOrUpdateScore(ScoreTeam, score.idTeam, calculatedScore);
			});
			getTeamWithMaxScore(scoreTeam, maxScore);
			const data = await TeamModel.getStudents(maxScore.idTeam);
			setWinners([data[0]]);
		}catch (e) {
			console.log('erreur getWinners',e);
		}
	}
	const addOrUpdateScore = (scoreTeam, idTeam, score) => {
		if (scoreTeam.has(idTeam)) {
			const currentScore = scoreTeam.get(idTeam);
			scoreTeam.set(idTeam, currentScore + score);
		} else {
			scoreTeam.set(idTeam, score);
		}
	};
	const getTeamWithMaxScore = (scoreTeam, firstKey) => {
		let result = firstKey.idTeam;
		let firstValue = scoreTeam.get(firstKey.idTeam)
		//recherche du score max dans la map
		scoreTeam.forEach((value, key) => {
			if (value > firstValue) {
				firstValue = value;
				result= key;
			}
		});
		return result;
	}
	
	
	
	const getWinRate = () => {
		if (scores == null) return 0;
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
	if (course == null) return <p>Loading</p>
	if (winners == null) return <p>Loading</p>

	return (
		// Affichage des informations de la partie
		// Grid pour afficher les informations sur 2 colonnes fixes
		<article className='info-block grid-block'>

			<InfoBlockElem title='Nom' text={game.name} additionalClasses='col-span-2 pt-2' />

			<InfoBlockElem title='Classe' text={course.name}/>


			<InfoBlockElem title='Date' text={game.createdAt.toLocaleDateString('fr-Fr')} />

			<InfoBlockElem title='Gagnants' text={game.state !== 2 ? 'Partie non terminée' : //console.log(getWinners().idTeam)}
				winners.map((stud) => stud.firstname + ' ' + stud.lastname)}
			/>

			<InfoBlockElem title='Taux de réussite' text={`${getWinRate()===0 ? 'Partie non terminée': getWinRate()+'%'}`} />

			{game.state === 2 ?
				<Link to={'./ranking/'+game.id} className="btn-show col-span-2">Voir</Link> :
				<span className="btn-show col-span-2">Partie en cours</span>
			}
		</article>
	)
}

GameElem.propTypes = {
	game: PropTypes.object.isRequired
}

export default GameElem;