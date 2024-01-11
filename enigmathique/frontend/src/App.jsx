import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Test from './pages/Test';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import CreationGame1 from './pages/CreationGame1';
import Class from './pages/Class';
import Students from './pages/Students';
import CreationGame2 from './pages/CreationGame2';
import './index.css';
import CreationGame3 from './pages/CreationGame3';


const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Home/>}/>
			<Route path='/signup' element={<Signup/>}/>
			<Route path='/login' element={<Login/>}/>
			<Route path='/test' element={<Test/>}/>
			<Route path='/dashboard' element={<Dashboard/>}/>
			<Route path='/creationgame' element={<CreationGame1/>}/>
			<Route path='/class' element={<Class/>}/>
			<Route path='/class/:id' element={<Students/>}/>
			<Route path='/creationgame2' element={<CreationGame2/>}/>
			<Route path='/creationgame3' element={<CreationGame3/>}/>
			<Route path='/game' element={<Game/>}/>
		</Routes>
	);
};
export default App;