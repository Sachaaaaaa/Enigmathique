import React from 'react';
import NavBarHome from '../components/NavBarHome';
import HomeForm from '../components/HomeForm';
import '../index.css';

/**
 * Page d'accueil
 * @returns {Element}
 * @constructor
 */
function Home() {
	return (
		<>
			<NavBarHome/>
			<HomeForm/>
		</>
	);
}

export default Home;
