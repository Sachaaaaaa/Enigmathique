import TeamService from "../services/team.service";
import StudentModel from "./student.model";
import ScoreModel from "./score.model";

class TeamModel{
	/**
	 * Constructeur d'une équipe
	 * @param name nom de l'équipe
	 * @param id identifiant de l'équipe
	 * @param idGame identifiant de la partie associée
	 */
	constructor(name, id, idGame) {
		this.name = name;
		this.id = id;
		this.idGame= idGame;
	}

	/**
	 * Getter d'une équipe à partir de son identifiant
	 * @param idTeam identifiant de l'équipe
	 * @returns l'équipe correspondant à l'identifiant
	 */
	static async getTeam(idTeam){
		try {
			//appel au service pour obtenir les données
			const data = await TeamService.getTeam(idTeam);
			//transformation des données en objet de TeamModel
			return new TeamModel(data.name, data.id, data.idGame);
		}catch (e){
			console.error(`erreur dans le getter d'une team dans le modèle de team (front) ${e}`);
		}
	}

	/**
	 * Getter des équipes à partir de l'identifiant d'une partie
	 * @param idGame identifiant de la partie dont on veut les équipes
	 * @returns liste des équipes de la partie renseignée
	 */
	static async getTeamFromGame(idGame){
		try {
			//appel de l'équipe pour obtenir les données
			const data = await TeamService.getTeamFromGame(idGame);
			//transformation des données en liste d'objet de TeamModel
			return data.map((team) =>new TeamModel(team.name, team.id, team.idGame));
		}catch (e){
			console.error(`erreur dans le getter des team pour une partie dans le modèle de team (front) ${e}`);
		}
	}

	/**
	 * Getter des élèves d'une équipe à partir de l'identifiant de l'équipe
	 * @param idTeam identifiant de l'équipe dont on veut les élèves
	 * @returns liste des élèves de l'équipe renseignée
	 */
	static async getStudents(idTeam){
		try {
			//appel au service pour obtenir les données
			const data = await TeamService.getStudents(idTeam);
			//transformation des données en liste d'objet de StudentModel
			return data.map((student) =>  new StudentModel(student.id, student.idCourse, student.firstname, student.lastname, student.createdAt, student.updatedAt));
		}catch (e){
			console.error(`erreur dans le getter des students d'une team dans le modèle de team (front) ${e}`);
		}
	}

	/**
	 * Getter des scores d'une équipe à partir de l'identifiant de l'équipe.
	 * L'équipe étant propre à une partie, cela correspond aux scores obtenus dans chaque salle lors d'une partie par une équipe
	 * @param idTeam identifiant de l'équipe dont on veut les scores
	 * @returns liste des scores correspondant à une équipe
	 */
	static async getScores(idTeam){
		try {
			//appel au service pour obtenir les données
			const data = await TeamService.getScores(idTeam);
			return data.map((score) =>new ScoreModel(score.idTeam, score.roomName, score.idGame, score.time, score.isSolved,
				score.nbGoodAnswers, score.nbBadAnswers, score.nbHints, score.createdAt, score.updatedAt));
		}catch (e){
			console.error(`erreur dans le getter des score d'une team dans le modèle de team (front) ${e}`);
		}
	}

}
export default TeamModel;