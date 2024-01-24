import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import StudentModel from "../../models/student.model";
import GameModel from "../../models/game.model";
import TeamModel from "../../models/team.model";
import {calculateScore, loadMembers} from "../stats/RankStyleManager";
import ContentHeader from "../dashboard/ContentHeader";
import TableContainer from "../dashboard/TableContainer";
import ActionButton from "../dashboard/ActionButton";
import TeamStats from "../../pages/TeamStats";

const StudentDetails = ({id}) =>{
	const [currentStudent, setCurrentStudent] = useState(null);
	const [games, setGames] = useState([]);
	//liste des teams de l'élève courant
	const [listTeam, setListTeam] = useState([]);
	//listes des scores de chaque team de l'élève
	const [listScores, setListScores] = useState([]);
	//la team qui va être sélectionnée pour voir les détails
	const [selectedTeam, setSelectedTeam] = useState(null);
	//les scores d'une team
	const [scoresForOneTeam, setScoresForOneTeam] = useState([]);

	/**
	 * Récupération de l'élève courant
	 * @returns {Promise<StudentModel>}
	 */
	const loadCurrentStudent = async () =>{
		const data = await StudentModel.getOne(id);
		setCurrentStudent(data);
		return data;
	}
	/**
	 * chargement de toutes les données à partir des games et de l'élève courant
	 */
	useEffect(() => {
		loadAllGames();
	}, []);

	/**
	 * Récupération de toutes les parties
	 * @returns {Promise<void>}
	 */
	const loadAllGames = async () =>{
		const data = await GameModel.getAll();
		setGames(data);
		const student = await loadCurrentStudent();
		loadAllData(data, student);
	}

	/**
	 * Récupération de toutes les données d'une partie
	 * @param games la liste des parties
	 * @param student l'élève courant
	 * @returns {Promise<void>}
	 */
	const loadAllData = (games, student) =>{
		games.map(async (game) => {
			//récupération de toutes les teams d'une partie
			const teams = await TeamModel.getTeamFromGame(game.id)
			teams.map(async (team) => {
				//récupération de tous les élèves d'une team
				const listStudents = await loadStudentFromTeam(team.id);

				addTeam(listStudents, team, student);
			})
		})
	}
	/**
	 * Récupération de tous les élèves d'une team
	 * @param id l'id de la team
	 * @returns {Promise<*>}
	 */
	const loadStudentFromTeam = async (id) =>{
		//récupération de toutes les teams d'une partie
		return await TeamModel.getStudents(id);
	}
	/**
	 * Ajout d'une team dans la liste des teams à condition qu'elle ne soit pas déjà présente dans
	 * la liste et que l'élève courant fasse partie de la team
	 * @param listStudents
	 * @param team
	 * @param currentStudent
	 * @returns {[]}
	 */
	const addTeam = (listStudents, team, currentStudent) => {
		listStudents.map((student) => {
			//.some permet de savoir si au moins un élément du tableau vérifie la condition
			if (student.id === currentStudent.id && !listTeam.some(existingTeam => existingTeam.id === team.id)){
				setListTeam([...listTeam, team]);
			}
		})
	}

	/**
	 * Récupération des scores de chaque team et création d'un score contenant les données
	 */
	const getRanking = async () => {
		//attendre que toutes les promesses soient chargées pour effectuer la suite
		const newScores = await Promise.all(
			listTeam.map( async (team) => {

				const scores = await TeamModel.getScores(team.id);
				const date = new Date(scores[0].createdAt);
				const calculatedScore = scores.reduce((sum, score) => sum +
						calculateScore(score.nbGoodAnswers, score.nbBadAnswers, score.nbHints, score.isSolved),
					0);


				const members = await loadMembers(team.id);
				return {
					id: team.id,
					date: date.toLocaleDateString(),
					name: team.name,
					members: members,
					calculatedScore: calculatedScore,
					nbSolved: scores.reduce((sum, score) => sum + score.nbGoodAnswers, 0),
				};
			})
		)
		setListScores((prevListScores) => {
			const uniqueNewScores = newScores.filter(
				(newScore) => !prevListScores.some((existingScore) => existingScore.id === newScore.id)
			);
			// Trier la liste combinée par dates la plus récentes
			const sortedList = [...prevListScores, ...uniqueNewScores].sort((a, b) => {
				return b.date.localeCompare(a.date);
			});
			return sortedList;
		});


	}

	useEffect(() => {
		if (listTeam.length > 0) {
			getRanking();
		}
	}, [listTeam]);
	const loadScoresForOneTeam = async (idTeam) => {
		const data = await TeamModel.getScores(idTeam);
		setScoresForOneTeam(data);
	}

	const handleDetailsClick = (team) => {
		setSelectedTeam(team);
		loadScoresForOneTeam(team.id);
	};


	return(
		<>
			<main>
				<ContentHeader
					title={currentStudent? currentStudent.firstname +' '+currentStudent.lastname :'Loading...'}
					link={`/class/${currentStudent? currentStudent.idCourse: '/class'}`}
				/>
				<div className="overflow-x-auto mt-4">
					<TableContainer headers={['Date','Équipe', 'Score', 'Énigmes Résolues', 'Action']}>
						{listScores.map((team, index) => (
							<tr key={team.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
								<td className="td-style">
									{team.date}
								</td>
								<td className="td-style">
									{team.name}
								</td>
								<td className="td-style">
									{team.calculatedScore}
								</td>
								<td className="td-style">
									{team.nbSolved}
								</td>
								<td className="td-style text-right">
									<ActionButton
										onClick={() => handleDetailsClick(team)}
										title='Détails'
									>
									</ActionButton>
								</td>
							</tr>
						))}
					</TableContainer>
				</div>
			</main>
			{selectedTeam && (
				<TeamStats
					teamData={selectedTeam}
					scores={scoresForOneTeam}
					onClose={() => setSelectedTeam(null)}
				/>
			)}
		</>
	)
}

StudentDetails.propTypes = {
	id: PropTypes.number.isRequired
}
export default StudentDetails;