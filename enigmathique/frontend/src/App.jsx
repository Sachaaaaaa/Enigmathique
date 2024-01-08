import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home'; // le style de l'application
import Login from './pages/Login'; // la page de connexion

const App = () => {
	return(
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
}
export default App;