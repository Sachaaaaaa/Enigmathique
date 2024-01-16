import ProfessorService from "../services/professor.course";

class Professor{
	constructor(id, lastname, firstname, mail) {
		this.id = id;
		this.lastname = lastname;
		this.firstname = firstname;
		this.mail = mail;
	}
	static async getCurrent(){
		try{
			let data = await ProfessorService.getCurrentProfessor();
			return new Professor(data.id, data.lastname, data.firstname, data.mail);
		}catch (error){
			console.log(error);
		}
	}
}
export default Professor;