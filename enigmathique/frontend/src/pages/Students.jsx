import React from 'react';
import SideBar from '../components/SideBar';
import ListStudents from '../components/ListStudents';

function Class() {
	return (
		<div className="flex">
			<SideBar/>
			<ListStudents/>
		</div>
	);
}
export default Class;