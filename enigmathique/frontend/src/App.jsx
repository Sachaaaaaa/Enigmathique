import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Test from './pages/Test'; // le style de l'application

const App = () => {
	return(
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/SignUp' element={<SignUp />} />
			<Route path='/test' element={<Test/>} />
		</Routes>
	);
}
export default App;