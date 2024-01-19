import TeamService from "../services/team.service";
import Student from "./student.model";

class TeamModel{
	constructor(name, id) {
		this.name = name;
		this.id = id;
	}
	static async getStudents(idTeam){
		try {
			const data = await TeamService.getStudents(idTeam);
			console.log(data);
			return TeamService.getStudents(idTeam);
		}catch (e){
			console.error(`erreur dans le getter des students d'une team dans le modèle de team (front) ${e}`);
		}
	}
	static async getScores(idTeam){
		try {
			return await TeamService.getScores(idTeam);
		}catch (e){
			console.error(`erreur dans le getter des score d'une team dans le modèle de team (front) ${e}`);
		}
	}
	static async getTeam(idTeam){
		try {
			const data = await TeamService.getTeam(idTeam);
			return new TeamModel(data.name, data.id);
		}catch (e){
			console.error(`erreur dans le getter d'une team dans le modèle de team (front) ${e}`);
		}
	}
	static async getTeamFromGame(idGame){
		try {
			const data = await TeamService.getTeamFromGame(idGame);
			return data.map((team) =>new TeamModel(team.name, team.id));
		}catch (e){
			console.error(`erreur dans le getter des team pour une partie dans le modèle de team (front) ${e}`);
		}
	}

}
export default TeamModel;