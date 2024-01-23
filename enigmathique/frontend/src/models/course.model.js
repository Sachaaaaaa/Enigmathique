import CourseService from "../services/course.service";

class CourseModel {
	/**
	 * Constructeur d'une classe
	 * @param id identifiant de la classe
	 * @param name nom de la classe
	 * @param idProfessor identifiant du prof référent
	 * @param createdAt date de création de la classe
	 * @param updatedAt date de dernière mise à jour de la classe
	 */
	constructor(id, name, idProfessor, createdAt, updatedAt) {
		this.id = id;
		this.name = name;
		this.idProfessor = idProfessor;
		this.createdAt = new Date(createdAt);
		this.updatedAt = new Date(updatedAt);
	}

	/**
	 * Getter de une classe à partir de son id
 	 * @param id identifiant de la classe
	 * @returns classe correspondant à l'id
	 */
	static async get(id) {
		try {
			//appel au service pour récupérer les données
			const data = await CourseService.getOne(id);
			//transformation des données en objet de la classe CourseModel
			return new CourseModel(data.id, data.name, data.idProfessor, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le getter d'une classe dans le modèle d'une classe (front) ${error}`);
		}
	}

	/**
	 * Getter de toutes les classes
	 * @returns liste de l'ensemble des classes
	 */
	static async getAll() {
		try {
			//appel au service pour récupérer les données
			const data = await CourseService.getAll();
			//transformation des données en une liste d'objets de la classe CourseModel
			return data.map((course) => new CourseModel(course.id, course.name, course.idProfessor, course.createdAt, course.updatedAt));
		}catch (error){
			console.log(`erreur dans le getter de toutes les classes dans le modèle d'une classe (front) ${error}`);
		}
	}

	/**
	 * Permet de supprimer une classe selon son identifiant
	 * @param id identifiant de la classe à supprimer
	 * @returns confirmation de la suppression de la classe
	 */
	static async delete(id) {
		try {
			//appel au service pour supprimer la classe correspondante
			return await CourseService.deleteId(id);
		}catch (error){
			console.log(`erreur dans le delete dans le modèle d'une classe (front) ${error}`);
		}
	}

	/**
	 * Permet de créer une classe à partir de son nom
	 * @param name nom de la classe à créer
	 * @returns la classe créée
	 */
	static async create(name) {
		try {
			//appel au service pour insérer les données dans la db et les obtenir
			const data = await CourseService.create(name);
			//création d'un nouvel objet CourseModel à partir de ces données
			return new CourseModel(data.id, data.name, data.idProfessor, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le create dans le modèle d'une classe (front) ${error}`);
		}
	}

	/**
	 * Permet de modifier le nom d'une classe selon son id
	 * @param name nouveau nom à attribuer à la classe
	 * @param id identifiant de la classe à modifier
	 * @returns la classe modifiée
	 */
	static async edit(name, id) {
		try {
			//appel au service pour modifier les données et les obtenir
			const data = await CourseService.edit(name, id);
			//transformation des données en objet CourseModel avec le nom changé
			return new CourseModel(data.id, data.name, data.idProfessor, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans l'edit dans le modèle d'une classe (front) ${error}`);
		}
	}

}

export default CourseModel;