import ProfessorService from "../services/professor.course";

class ProfessorModel {
	/**
	 * constructeur du professeur
	 * @param id identifiant du professeur
	 * @param lastname nom de famille du professeur
	 * @param firstname prénom du professor
	 * @param mail e-mail du professeur
	 */
	constructor(id, lastname, firstname, mail) {
		this.id = id;
		this.lastname = lastname;
		this.firstname = firstname;
		this.mail = mail;
	}

	/**
	 * Getter du professeur actuellement connecté
	 * @returns le professeur de la session
	 */
	static async getCurrent(){
		try{
			//appel au service pour récupérer les données
			const data = await ProfessorService.getCurrentProfessor();
			//transformation des données en objet de ProfessorModel
			return new ProfessorModel(data.id, data.lastname, data.firstname, data.mail);
		}catch (error){
			console.log(`erreur dans le getter du Professeur courant dans le modèle de professeur (front) ${error}`);
		}
	}
}
export default ProfessorModel;