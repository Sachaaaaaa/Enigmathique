import LayoutProf from '../layouts/LayoutProf';
import React from 'react';
import ListStudents from '../components/ListStudents';
import {useParams} from 'react-router-dom';

function Class() {
	const {id} = useParams()
	return (
		<LayoutProf>
			<main className='h-screen main-background-color overflow-auto'>
				<ListStudents id={parseInt(id)}/>
			</main>
		</LayoutProf>
	);
}

export default Class;