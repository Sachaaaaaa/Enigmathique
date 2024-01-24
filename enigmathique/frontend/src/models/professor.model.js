import ProfessorService from "../services/professor.course";

class ProfessorModel {
	constructor(id, lastname, firstname, mail) {
		this.id = id;
		this.lastname = lastname;
		this.firstname = firstname;
		this.mail = mail;
	}
	static async getCurrent(){
		try{
			let data = await ProfessorService.getCurrentProfessor();
			return new ProfessorModel(data.id, data.lastname, data.firstname, data.mail);
		}catch (error){
			console.log(`erreur dans le getter du Professeur courant dans le modèle de professeur (front) ${error}`);
		}
	}
}
export default ProfessorModel;