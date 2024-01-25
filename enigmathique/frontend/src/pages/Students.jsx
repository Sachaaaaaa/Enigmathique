import LayoutProf from '../layouts/LayoutProf';
import React, {useEffect} from 'react';
import ListStudents from '../components/student/ListStudents';
import Notification from '../components/Notification';
import {useNavigate, useParams} from 'react-router-dom';
import StudentModel from "../models/student.model";

function Students() {
	const {id} = useParams();
	const [students, setStudents] = React.useState([]);
	const navigate = useNavigate();
	const loadStudents = async () => {

		const data = await StudentModel.getAll(id);
		console.log(data);
		setStudents(data);

		if (data !== undefined) {
			return;
		}
		navigate('/class');
	};
	useEffect(() => {
		loadStudents();
	}, [students]);

	return (
		<LayoutProf>
			<main>
				<Notification/>
				<ListStudents students={students} id={id}/>

			</main>
		</LayoutProf>
	);
}

export default Students;