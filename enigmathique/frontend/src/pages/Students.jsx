import React from 'react';
import SideBar from '../components/SideBar';
import ListStudents from '../components/ListStudents';
import {useParams} from 'react-router-dom';

function Class() {
	const {id} = useParams()
	return (
		<div className='flex'>
			<SideBar/>
			<ListStudents id={parseInt(id)}/>
		</div>
	);
}

export default Class;