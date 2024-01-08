import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Test from './pages/Test';
import Game from './pages/Game';
import './index.css';

const App = () => {
	return(
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='/login' element={<Login />} />
			<Route path='/test' element={<Test/>} />
			<Route path='/game' element={<Game/>} />
		</Routes>
	);
};
export default App;