import LayoutProf from '../layouts/LayoutProf';
import React from 'react';
import ListStudents from '../components/student/ListStudents';
import {useParams} from 'react-router-dom';

function Students() {
	const {id} = useParams()
	return (
		<LayoutProf>
			<main className='h-screen main-background-color overflow-auto'>
				<ListStudents id={parseInt(id)}/>
			</main>
		</LayoutProf>
	);
}

export default Students;