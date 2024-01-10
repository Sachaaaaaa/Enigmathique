import React from 'react';
import SideBar from '../components/SideBar';
import GameCreationForm from '../components/GameCreationForm';
function Home() {
	return (
		<div className="flex">
			<SideBar />
			<GameCreationForm />
		</div>
	);
}
export default Home;