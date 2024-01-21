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
			console.log("response");
			console.log(response[0]);
			winners=response[0];
			console.log(winners[0]);
		}).catch((error) => {
			console.log(error);
		});
		return winners;
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

	return (
		// Affichage des informations de la partie
		// Grid pour afficher les informations sur 2 colonnes fixes
		<article className='info-block grid-block'>

			<InfoBlockElem title='Nom' text={game.name} additionalClasses='col-span-2 pt-2' />

			<InfoBlockElem title='Classe' text={course.name}/>


			<InfoBlockElem title='Date' text={game.createdAt.toLocaleString()} />

			<InfoBlockElem title='Gagnants' text={game.state !== 2 ? 'Partie non terminée' : console.log("non")
					//getWinners().map((stud) => {`${stud.firstname} ${stud.lastname} `})
					} />

			<InfoBlockElem title='Taux de réussite' text={getWinRate()+' %'} />

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