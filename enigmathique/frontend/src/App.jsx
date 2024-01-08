import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home'; // le style de l'application

function App() {
	return(
		<Routes>
			<Route path='/' element={<Home />} />
		</Routes>
	);
}
export default App;