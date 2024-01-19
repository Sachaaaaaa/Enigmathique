import React from 'react';
import SideBar from '../components/SideBar';
import ListClass from '../components/ListClass';
import LayoutProf from "../layouts/LayoutProf";

function Class() {
	return (
		<LayoutProf>
			<main className=' h-screen main-background-color overflow-x-hidden'>
				<ListClass />
			</main>
		</LayoutProf>
	);
}
export default Class;
