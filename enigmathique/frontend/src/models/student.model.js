import StudentService from "../services/student.service";

class Student {
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
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	static async getAll(id) {
		try {
			const data = await StudentService.getAll(id);
			return data.map((student) => new Student(student.id, student.idCourse, student.firstname, student.lastname, student.createdAt, student.updatedAt));
		}catch (error){
			console.log(error);
		}
	}

}
export default Student;