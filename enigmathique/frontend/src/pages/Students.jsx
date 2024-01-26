import LayoutProf from 'layouts/LayoutProf';
import React, {useEffect} from 'react';
import ListStudents from 'components/student/ListStudents';
import Notification from 'components/Notification';
import {useNavigate, useParams} from 'react-router-dom';
import StudentModel from 'models/student.model';

/**
 * Page des étudiants d'une classe
 * @returns {Element}
 * @constructor
 */
function Students() {
	const {id} = useParams();
	const parseId = parseInt(id);
	const [students, setStudents] = React.useState([]);
	const navigate = useNavigate();
	/**
	 * Charge les étudiants d'une classe
	 * @returns {Promise<void>}
	 */
	const loadStudents = async () => {

		const data = await StudentModel.getAll(id);
		setStudents(data);
		if (data !== undefined) {
			return;
		}
		navigate('/class');
	};
	/**
	 * useEffect pour charger les étudiants d'une classe au chargement de la page
	 */
	useEffect(() => {
		loadStudents();
	}, []);

	return (
		<LayoutProf title="" id={parseId}>
			<main>
				<Notification/>
				<ListStudents students={students} id={parseId} loadStudents={loadStudents}/>

			</main>
		</LayoutProf>
	);
}

export default Students;