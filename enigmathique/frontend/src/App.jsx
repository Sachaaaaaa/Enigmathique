import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from 'pages/Home';
import Signup from 'pages/Signup';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import Game from 'pages/Game';
import Class from 'pages/Class';
import Students from 'pages/Students';
import 'index.css';
import Games from 'pages/Games';
import Join from 'pages/Join';
import PreGameWrapper from 'components/contexts/PreGame.wrapper';
import CreateGameWrapper from 'components/contexts/CreationGame.wrapper';
import RoomList from 'pages/RoomPage';
import ProfFollowUp from 'pages/ProfFollowUp';
import Ranking from 'pages/Ranking';
import StudentStats from 'pages/StudentStats';
import NotFound from 'pages/NotFound';
import CLassStats from 'pages/ClassStats';
import CGU from 'pages/CGU';

/**
 * Composant principal de l'application
 * @returns {Element}
 * @constructor
 */
const App = () => {
	return (
		//Liste des routes accessibles du site
		<Routes>
			<Route path='*' element={<NotFound/>}/>
			<Route path='/' element={<Home/>}/>
			<Route path='/signup' element={<Signup/>}/>
			<Route path='/login' element={<Login/>}/>
			<Route path='/dashboard' element={<Dashboard/>}/>
			<Route path='/class' element={<Class/>}/>
			<Route path='/class/:id' element={<Students/>}/>
			<Route path='/game' element={<Game/>}/>
			<Route path='/games' element={<Games/>}/>
			<Route path='/create-game' element={<CreateGameWrapper/>}/>
			<Route path='/pregame/:sessionId' element={<PreGameWrapper/>}/>
			<Route path='/join/:sessionId' element={<Join/>}/>
			<Route path='/rooms' element={<RoomList/>}/>
			<Route path='/leaderboard' element={<ProfFollowUp/>}/>
			<Route path='/ranking/:idGame' element={<Ranking/>}/>
			<Route path='/student/stats/:idStudent' element={<StudentStats/>}/>
			<Route path='/class/stats/:idClass' element={<CLassStats/>}/>
			<Route path='/cgu' element={<CGU/>}/>
		</Routes>
	);
};
export default App;