import StudentService from "../services/student.service";

class StudentModel {
	/**
	 * @param id
	 * @param idCourse
	 * @param firstname
	 * @param lastname
	 * @param createdAt
	 * @param updatedAt
	 */
	constructor(id, idCourse, firstname, lastname, createdAt, updatedAt) {
		this.id = id;
		this.idCourse = idCourse;
		this.firstname = firstname;
		this.lastname = lastname;
		this.createdAt = new Date(createdAt);
		this.updatedAt = new Date(updatedAt);
	}
	static async getAll(idCourse) {
		try {
			const data = await StudentService.getAll(idCourse);
			return data.map((student) => new StudentModel(student.id, student.idCourse, student.firstname, student.lastname, student.createdAt, student.updatedAt));
		}catch (error){
			console.log(`erreur dans le getter de tous les student dans le modèle de student (front) ${error}`);
		}
	}
	static async getOne(idStudent){
		try {
			const data = await StudentService.getOne(idStudent);
			return new StudentModel(data.id, data.idCourse, data.firstname, data.lastname, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le getter d'un student dans le modèle de student (front) ${error}`);
		}
	}
	static async delete(id) {
		try {
			return await StudentService.deleteId(id);
		}catch (error){
			console.log(`erreur dans le delete dans le modèle de student (front) ${error}`);
		}
	}
	static async create(firstname, lastname, idCourse) {
		try {
			const data = await StudentService.create(firstname, lastname, idCourse);
			return new StudentModel(data.id, data.idCourse, data.firstname, data.lastname, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le create dans le  modèle de student (front) ${error}`);
		}
	}
	static async edit(firstname, lastname, idCourse, idStudent) {
		try {
			const data = await StudentService.edit(firstname, lastname, idCourse, idStudent);
			return new StudentModel(data.id, data.idCourse, data.firstname, data.lastname, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(`erreur dans le create dans le  modèle de student  (front) ${error}`);
		}
	}

}
export default StudentModel;