import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import StudentModel from "../../models/student.model";
import CourseModel from "../../models/course.model";
import GameModel from "../../models/game.model";
import TeamModel from "../../models/team.model";
import {calculateScore, getPositionIcon, getPositionStyle, loadMembers} from "../stats/RankStyleManager";
import ContentHeader from "../dashboard/ContentHeader";
import TableContainer from "../dashboard/TableContainer";
import ActionButton from "../dashboard/ActionButton";
import TeamStats from "../../pages/TeamStats";
import LayoutProf from "../../layouts/LayoutProf";
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
		console.log('games',data);
		loadAllData(data);
	}

	/**
	 * Récupération de toutes les données d'une partie
	 * @param games la liste des parties
	 * @returns {Promise<void>}
	 */
	const loadAllData = (games) =>{

		games.map(async (game) => {
			//récupération de toutes les teams d'une partie
			const teams = await TeamModel.getTeamFromGame(game.id)
			console.log('les teams',teams)
			teams.map(async (team) => {
				//récupération de tous les élèves d'une team
				const listStudents = await loadStudentFromTeam(team.id);
				console.log('les students',listStudents)
				const student= await loadCurrentStudent();
				console.log('le student',student);
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
		const students = await TeamModel.getStudents(id)
		return students;
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
	console.log('listTeam',listTeam);

	/**
	 * Récupération des scores de chaque team et création d'un score contenant les données
	 */
	const getRanking = async () => {
		//attendre que toutes les promesses soient chargées pour effectuer la suite
		const listItem = await Promise.all(
			listTeam.map( async (team) => {
				const scores = await TeamModel.getScores(team.id);
				const calculatedScore = scores.reduce((sum, score) => sum +
						calculateScore(score.nbGoodAnswers, score.nbBadAnswers, score.nbHints),
					0);
				const members = await loadMembers(team.id);
				return {
					id: team.id,
					name: team.name,
					members: members,
					calculatedScore: calculatedScore,
					nbSolved: scores.reduce((sum, score) => sum + score.nbGoodAnswers, 0),
				};
			})
		)
		setListScores(listItem);
		console.log('listItem',listItem);
		console.log('listScores',listScores);

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
		console.log('team',team);
		setSelectedTeam(team);
		loadScoresForOneTeam(team.id);
	};


	return(
		<>
			<main>
				<ContentHeader title={currentStudent? currentStudent.name:'Loading...'} link='/dashboard'/>
				<div className="overflow-x-auto mt-4">
					<TableContainer headers={['Position','Équipe', 'Score', 'Énigmes Résolues', 'Action']}>

						{listScores.map((team, index) => (
							<tr key={team.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
								<td className="px-6 py-4 flex items-center justify-left">
									<div className={`relative ${getPositionStyle(index)}`}>
										{getPositionIcon(index)}
										<span className="absolute inset-0 flex items-center justify-center">
											{index + 1}
										</span>
									</div>
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

//TODO solution alternative pour le chargement des données vérfier l'efficacité entre les deux
/**
	useEffect(() => {
		loadCurrentStudent();
		//chargement de tous les datas au fur et à mesure
		const fetchData = async () => {
			const gamesdata = await loadAllGames();
			await loadAllData(gamesdata);
		};
		fetchData();
	}, []);


	const loadAllGames = async () =>{
		const data = await GameModel.getAll();
		setGames(data);
		return data;
	}

	const loadAllData = async (games) =>{
		//attendre que toutes les parties soient chargées pour effectuer la suite
		await Promise.all(
			games.map(async (game) => {
				//récupération de toutes les teams d'une partie
				const teams = await TeamModel.getTeamFromGame(game.id)
				console.log('les teams',teams)
				//attendre que toutes les teams soient chargées pour effectuer la suite
				await Promise.all(
					teams.map((team) => loadStudentFromTeam(team.id))
				);
			})
		);
	};*/