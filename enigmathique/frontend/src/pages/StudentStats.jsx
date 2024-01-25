import React from 'react';
import {useParams} from "react-router-dom";
import StudentDetails from "../components/student/StudentDetails";
import Notification from "../components/Notification";
import ListStudents from "../components/student/ListStudents";
import LayoutProf from "../layouts/LayoutProf";
const StudentStats = () =>{
	const {idStudent} = useParams();
	return(
		<LayoutProf title='student' id={parseInt(idStudent)}>
			<main>
				<Notification/>
				<StudentDetails id={parseInt(idStudent)}/>
			</main>
		</LayoutProf>
	)
}
export default StudentStats;