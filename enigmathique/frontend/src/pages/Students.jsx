import LayoutProf from '../layouts/LayoutProf';
import React from 'react';
import ListStudents from '../components/student/ListStudents';
import {useParams} from 'react-router-dom';

function Students() {
	const {id} = useParams()
	return (
		<LayoutProf>
			<main>
				<ListStudents id={parseInt(id)}/>
			</main>
		</LayoutProf>
	);
}

export default Students;