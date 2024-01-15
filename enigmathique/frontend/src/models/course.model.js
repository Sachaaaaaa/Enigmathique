import CourseService from "../services/course.service";

class Course {
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
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	static async get(id) {
		try {
			const data = await CourseService.getOne(id);
			return new Course(data.id, data.name, data.idProfessor, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(error);
		}
	}
	static async getAll() {
		try {
			const data = await CourseService.getAll();
			return data.map((course) => new Course(course.id, course.name, course.idProfessor, course.createdAt, course.updatedAt));
		}catch (error){
			console.log(error);
		}
	}
	static async delete(id) {
		try {
			const data = await CourseService.deleteId(id);
			return 1;
		}catch (error){
			console.log(error);
		}
	}

	static async create(name) {
		try {
			const data = await CourseService.create(name);
			return new Course(data.id, data.name, data.idProfessor, data.createdAt, data.updatedAt);
		}catch (error){
			console.log(error);
		}
	}

}

export default Course;