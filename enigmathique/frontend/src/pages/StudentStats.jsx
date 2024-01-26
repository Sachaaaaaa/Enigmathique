import React from 'react';
import {useParams} from 'react-router-dom';
import StudentDetails from 'components/student/StudentDetails';
import Notification from 'components/Notification';
import LayoutProf from 'layouts/LayoutProf';

/**
 * Page des statistiques d'un étudiant
 * @returns {Element}
 * @constructor
 */
const StudentStats = () =>{
	const {idStudent} = useParams();
	return(
		<LayoutProf title='Statistiques'>
			<main>
				<Notification/>
				<StudentDetails id={parseInt(idStudent)}/>
			</main>
		</LayoutProf>
	);
};
export default StudentStats;