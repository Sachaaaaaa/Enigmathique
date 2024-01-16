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
import CreateGame from "./pages/CreateGame";
import {CreationGameDataProvider} from "./components/contexts/CreationGame.context";
import PreGame from "./pages/PreGame";
import TeamStats from "./pages/TeamStats";
import { RoomProvider } from './contexts/RoomContext';
import Games from "./pages/Games";
import {PreGameDataProvider} from "./components/contexts/PreGame.context";
import PreGameWrapper from "./components/contexts/PreGame.wrapper";
import CreateGameWrapper from "./components/contexts/CreationGame.wrapper";
import RoomList from 'pages/RoomList';


const App = () => {
	return (
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
			<Route path='/create-game' element={<CreateGameWrapper/>}/>
			<Route path='/pregame/:code' element={<PreGameWrapper/>}/>
			<Route path='/teamstats' element={<TeamStats/>}/>
			<Route path='/rooms' element={<RoomList/>}/>
		</Routes>
	);
};
export default App;