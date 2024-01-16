import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Test from './pages/Test';
import Dashboard from './pages/Dashboard';
import Game from './pages/Game';
import Class from './pages/Class';
import Students from './pages/Students';
import './index.css';
import CreateGame from './pages/CreateGame';
import {CreationGameDataProvider} from './components/contexts/CreationGame.context';
import PreGame from './pages/PreGame';
import TeamStats from './pages/TeamStats';
import { RoomProvider } from './contexts/RoomContext';
import Games from './pages/Games';
import ProfFollowUp from './pages/ProfFollowUp';
import Join from './pages/Join';


const App = () => {
	return (
		<CreationGameDataProvider>
			<Routes>
				<Route path='/' element={<Home/>}/>
				<Route path='/signup' element={<Signup/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/test' element={<Test/>}/>
				<Route path='/dashboard' element={<Dashboard/>}/>
				<Route path='/class' element={<Class/>}/>
				<Route path='/class/:id' element={<Students/>}/>
				<Route path='/game' element={<Game/>}/>
				<Route path='/games' element={<Games/>}/>
				<Route path='/create-game' element={<CreateGame/>}/>
				<Route path='/pregame/:id' element={<PreGame/>}/>
				<Route path='/join/:id' element={<Join/>}/>
				<Route path='/teamstats' element={<TeamStats/>}/>
				<Route path='/prof-folow-up' element={<ProfFollowUp/>}/>
			</Routes>
		</CreationGameDataProvider>
	);
};
export default App;