import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import StudentModel from "../../models/student.model";
import CourseModel from "../../models/course.model";
const StudentDetails = ({id}) =>{
	const [currentStudent, setCurrentStudent] = useState(null);

	const loadStudent = async () =>{
		const data = await StudentModel.getOne(id);
		setCurrentStudent(data);
	}
	useEffect(() => {
		loadStudent();
	}, []);
	console.log(currentStudent);
	const loadCourses = async () =>{
		const data = await CourseModel.get(id);
		console.log(data);
	}




	return(
		<div>
			<h1>Student Stats</h1>
		</div>
	)
}
StudentDetails.propTypes = {
	id: PropTypes.string.isRequired
}
export default StudentDetails;