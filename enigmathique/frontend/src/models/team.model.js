import TeamService from "../services/team.service";
import StudentModel from "./student.model";
import ScoreModel from "./score.model";

class TeamModel{
	constructor(name, id, idGame) {
		this.name = name;
		this.id = id;
		this.idGame= idGame;
	}
	//TODO corriger le format de retour de l'API pour les students

	static async getStudents(idTeam){
		try {
			const data = await TeamService.getStudents(idTeam);
			return data.map((student) =>  new StudentModel(student.id, student.idCourse, student.firstname, student.lastname, student.createdAt, student.updatedAt));
		}catch (e){
			console.error(`erreur dans le getter des students d'une team dans le modèle de team (front) ${e}`);
		}
	}
	static async getScores(idTeam){
		try {
			const data = await TeamService.getScores(idTeam);
			return data.map((score) =>new ScoreModel(score.idTeam, score.roomName, score.idGame, score.time, score.isSolved,
				score.nbGoodAnswers, score.nbBadAnswers, score.nbHints, score.createdAt, score.updatedAt));
		}catch (e){
			console.error(`erreur dans le getter des score d'une team dans le modèle de team (front) ${e}`);
		}
	}
	//TODO ajouter le getter pour récupérer les infos d'une team dans l'API
	static async getTeam(idTeam){
		try {
			const data = await TeamService.getTeam(idTeam);
			return new TeamModel(data.name, data.id, data.idGame);
		}catch (e){
			console.error(`erreur dans le getter d'une team dans le modèle de team (front) ${e}`);
		}
	}
	static async getTeamFromGame(idGame){
		try {
			const data = await TeamService.getTeamFromGame(idGame);
			return data.map((team) =>new TeamModel(team.name, team.id, team.idGame));
		}catch (e){
			console.error(`erreur dans le getter des team pour une partie dans le modèle de team (front) ${e}`);
		}
	}

}
export default TeamModel;