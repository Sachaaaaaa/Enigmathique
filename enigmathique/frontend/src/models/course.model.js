import CourseService from "../services/course.service";

class CourseModel {
	/**
	 *
	 * @param id
	 * @param name
	 * @param idProfessor
	 * @param createdAt
	 * @param updatedAt
	 */
	constructor(id, name, idProfessor, createdAt, updatedAt) {
		this.id = id;
		this.name = name;
		this.idProfessor = idProfessor;
		this.createdAt = new Date(createdAt);
		this.updatedAt = new Date(updatedAt);
	}

	static async get(id) {
		try {
			const data = await CourseService.getOne(id);
			return new CourseModel(data.id, data.name, data.idProfessor, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le getter d'une classe dans le modèle d'une classe (front) ${error}`);
		}
	}
	static async getAll() {
		try {
			const data = await CourseService.getAll();
			return data.map((course) => new CourseModel(course.id, course.name, course.idProfessor, course.createdAt, course.updatedAt));
		}catch (error){
			console.log(`erreur dans le getter de toutes les classes dans le modèle d'une classe (front) ${error}`);
		}
	}
	static async delete(id) {
		try {
			return await CourseService.deleteId(id);
		}catch (error){
			console.log(`erreur dans le delete dans le modèle d'une classe (front) ${error}`);
		}
	}

	static async create(name) {
		try {
			const data = await CourseService.create(name);
			return new CourseModel(data.id, data.name, data.idProfessor, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le create dans le modèle d'une classe (front) ${error}`);
		}
	}
	static async edit(name, id) {
		try {
			const data = await CourseService.edit(name, id);
			return new CourseModel(data.id, data.name, data.idProfessor, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans l'edit dans le modèle d'une classe (front) ${error}`);
		}
	}

}

export default CourseModel;