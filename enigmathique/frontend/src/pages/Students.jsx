import LayoutProf from '../layouts/LayoutProf';
import React from 'react';
import ListStudents from '../components/student/ListStudents';
import Notification from '../components/Notification';
import {useParams} from 'react-router-dom';

function Students() {
	const {id} = useParams()
	return (
		<LayoutProf>
			<main>
				<Notification/>
				<ListStudents id={parseInt(id)}/>
			</main>
		</LayoutProf>
	);
}

export default Students;