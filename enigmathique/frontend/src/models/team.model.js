import TeamService from "../services/team.service";
import Student from "./student.model";

class TeamModel{
	constructor(name, id) {
		this.name = name;
		this.id = id;
	}
	static async getStudents(idTeam){
		/**
		const data = await TeamService.getStudents(idTeam);
		return data.map((student) => new Student(student.name, student.id));
		*/
		try {
			const data = await TeamService.getStudents(idTeam);
			console.log(data);
			return TeamService.getStudents(idTeam);
		}catch (e){
			console.error(e);
		}
	}
	static async getScores(idTeam){
		try {
			return await TeamService.getScores(idTeam);
		}catch (e){
			console.error(e);
		}
	}
	static async getTeam(idTeam){
		try {
			const data = await TeamService.getTeam(idTeam);
			return new TeamModel(data.name, data.id);
		}catch (e){
			console.error(e);
		}
	}

}
export default TeamModel;