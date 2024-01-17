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
			return TeamService.getStudents(idTeam);
		}catch (e){
			console.error(e);
		}
	}

}
export default TeamModel;