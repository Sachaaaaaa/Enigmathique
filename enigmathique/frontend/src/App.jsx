import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp'; // le style de l'application

const App = () => {
	return(
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/SignUp' element={<SignUp />} />
		</Routes>
	);
}
export default App;