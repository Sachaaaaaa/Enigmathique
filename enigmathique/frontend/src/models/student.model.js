import StudentService from "../services/student.service";

class StudentModel {
	/**
	 * Constructeur de l'élève
	 * @param id identifiant de l'élève
	 * @param idCourse identifiant de la classe de l'élève
	 * @param firstname prénom de l'élève
	 * @param lastname nom de famille de l'élève
	 * @param createdAt date de création de l'élève
	 * @param updatedAt date de dernière mise à jour de l'élève
	 */
	constructor(id, idCourse, firstname, lastname, createdAt, updatedAt) {
		this.id = id;
		this.idCourse = idCourse;
		this.firstname = firstname;
		this.lastname = lastname;
		this.createdAt = new Date(createdAt);
		this.updatedAt = new Date(updatedAt);
	}

	/**
	 * Getter d'un élève à partir de son identifiant
	 * @param idStudent identifiant de l'élève
	 * @returns l'élève qui correspond à l'identifiant
	 */
	static async getOne(idStudent){
		try {
			//appel au service pour obtenir les données
			const data = await StudentService.getOne(idStudent);
			//transformation des données en objet de StudentModel
			return new StudentModel(data.id, data.idCourse, data.firstname, data.lastname, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le getter d'un student dans le modèle de student (front) ${error}`);
		}
	}

	/**
	 * Getter de tous les élèves d'une classe identifiée
	 * @param idCourse identifiant de la classe dont on veut les élèves
	 * @returns liste des élèves de la classe
	 */
	static async getAll(idCourse) {
		try {
			//appel au service pour récupérer les données
			const data = await StudentService.getAll(idCourse);
			//transformation des données en liste d'objet de StudentModel
			return data.map((student) => new StudentModel(student.id, student.idCourse, student.firstname, student.lastname, student.createdAt, student.updatedAt));
		}catch (error){
			console.log(`erreur dans le getter de tous les student dans le modèle de student (front) ${error}`);
		}
	}

	/**
	 * Permet de créer un étudiant à partir de son prénom, de son nom de famille et de l'identifiant de sa classe
	 * @param firstname prénom de l'élève
	 * @param lastname nom de famille de l'élève
	 * @param idCourse identifiant de la classe de l'élève
	 * @returns le nouvel élève
	 */
	static async create(firstname, lastname, idCourse) {
		try {
			//appel au service pour insérer les données dans la db et les obtenir
			const data = await StudentService.create(firstname, lastname, idCourse);
			//création d'un nouvel objet StudentModel à partir de ces données
			return new StudentModel(data.id, data.idCourse, data.firstname, data.lastname, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le create dans le  modèle de student (front) ${error}`);
		}
	}

	/**
	 * Permet de modifier le prénom, le nom de famille et la classe d'un élève à partir de son identifiant
	 * @param firstname nouveau prénom de l'élève
	 * @param lastname nouveau nom de famille de l'élève
	 * @param idCourse identifiant de la nouvelle classe de l'élève
	 * @param idStudent identifiant de l'élève à modifier
	 * @returns l'élève modifié
	 */
	static async edit(firstname, lastname, idCourse, idStudent) {
		try {
			//appel au service pour modifier les données et les obtenir
			const data = await StudentService.edit(firstname, lastname, idCourse, idStudent);
			//transformation des données en objet StudentModel avec les informations modifiées
			return new StudentModel(data.id, data.idCourse, data.firstname, data.lastname, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le create dans le  modèle de student  (front) ${error}`);
		}
	}

	/**
	 * Permet de supprimer un élève à partir de son identifiant
	 * @param id identifiant de l'élève à supprimer
	 */
	static async delete(id) {
		try {
			//appel au service pour supprimer l'élève correspondant
			return await StudentService.deleteId(id);
		}catch (error){
			console.log(`erreur dans le delete dans le modèle de student (front) ${error}`);
		}
	}

}
export default StudentModel;