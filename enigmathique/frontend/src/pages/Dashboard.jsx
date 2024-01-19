import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ClassElem from '../components/dashboard/ClassElem';
import RoomElem from '../components/dashboard/RoomElem';
import GameElem from '../components/dashboard/GameElem';
import {randInt} from 'three/src/math/MathUtils';
import LayoutProf from '../layouts/LayoutProf';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import Course from '../models/course.model';
import RoomService from "../services/room.service";
import Game from "../models/game.model";
import RoomModel from "../models/room.model";


const Dashboard = () => {

	// Ajout d'un état pour avoir les classes
	const [courses, setCourses] = useState([]);
	// Ajout d'un état pour avoir les parties
	const [games, setGames] = useState([]);
	// Ajout d'un état pour avoir les rooms
	const [rooms, setRooms] = useState([]);
	// Ajout d'un état pour les salles sélectionnées
	const [selectedRooms, setSelectedRooms] = useState([]);
	// Ajout d'un état pour suivre l'indice de la classe actuelle
	const [currentClassIndex, setCurrentClassIndex] = useState(0);

	const loadClasses = async () => {
		const data = await Course.getAll();
		setCourses(data);
	}

	const loadRooms = async() => {
		const data = await RoomModel.getAll();
		setRooms(data);
	}
	const loadGames = async () => {
		const data = await Game.getAll();
		setGames(data);
	}
	useEffect(() => {
		loadClasses();
		loadGames();
		loadRooms();
	}, []);

	useEffect(() => {
		roomSelection();
	}, [rooms]);

	// Choix des salles à afficher
	const roomSelection = () => {
		//TODO: régler le problème de chargement
		console.log(rooms);
		if(rooms.length > 2) {
			let max = rooms.length - 1;
			let roomSelect = [];
			let selectedIndex = -1;
			while (roomSelect.length < 2) {
				let index = randInt(0, max);
				if (index !== selectedIndex) {
					roomSelect.push(rooms[index]);
				}
				selectedIndex = index;
			}
			return setSelectedRooms(roomSelect);
		} else if(rooms.length !== 0){
			setSelectedRooms(rooms);
		} else {
			setSelectedRooms([]);
		}
	};



	// Fonction pour aller à la classe précédente
	const prevClass = () => {
		setCurrentClassIndex(prevIndex =>
			prevIndex > 0 ? prevIndex - 1 : courses.length - 1
		);
	};

	// Fonction pour aller à la classe suivante
	const nextClass = () => {
		setCurrentClassIndex(prevIndex =>
			prevIndex < courses.length - 1 ? prevIndex + 1 : 0
		);
	};

	// Fonction pour afficher les parties
	const showGames = () => {
		if(games.length !== 0) {
			console.log(games);
			if (games.length >= 2) {
				return games.slice(-2).map((game, index) => (
					<GameElem key={index} game={game}/>
				));
			} else if (games.length === 1) {
				return (
					<>
						<GameElem key={0} game={games[0]}/>
						<div className='empty-info-container'>
							<Link to='/create-game' className='primary-font-color w-fit text-sm hover:underline'>Nouvelle partie ? </Link>
						</div>
					</>);
			}
		} else {
			return <>
				<div className='empty-info-container'><Link to='/create-game' className='primary-font-color w-fit text-sm hover:underline'>Nouvelle partie ? </Link></div>
			<div className='empty-info-container'> <Link to='/create-game' className='primary-font-color w-fit text-sm hover:underline'>Nouvelle partie ? </Link></div> </>;
		}
	}


	return (
		<LayoutProf>
			<main className='main-background-color flex flex-wrap flex-grow gap-2 justify-between overflow-y-scroll overflow-x-hidden'>
					<div className='w-[45svw] min-w-[280px] grow p-5'>
						<div className='flex flex-col '>
							<div className='primary-font-color flex justify-between w-full min-w-[280px]'>
								<h2 className='medium-title'>Mes Parties</h2>
								<Link to='/games' className='show-all-text'>Voir tout</Link>
							</div>
							<div className='w-full h-full flex flex-wrap flex-grow justify-between items-center gap-2'>
								{showGames()}
							</div>
						</div>
						<div className='flex flex-col pt-7'>
							<div className='primary-font-color flex justify-between  w-full min-w-[280px]'>
								<h2 className='font-semibold'>Proposition de salles</h2>
								<Link to='/rooms' className='text-sm font-semibold hover:underline'>Voir tout</Link>
							</div>
							<div className='w-full h-full flex flex-wrap flex-grow justify-between items-center gap-2'>
								{selectedRooms.map((room, index) => (
									<RoomElem key={index} room={room}></RoomElem>
								))}
							</div>
						</div>
					</div>
					<div className='w-[35svw] min-w-[280px] grow p-5'>
						<div className='primary-font-color flex justify-between w-full min-w-[280px]'>
							<h2 className='medium-title'>Mes Classes</h2>
							<div>
								<button onClick={prevClass}><FaAngleLeft /></button>
								<button onClick={nextClass}><FaAngleRight /></button>
							</div>
						</div>
						{/* Afficher seulement la classe actuellement sélectionnée */}
						{courses.length !== 0 && <ClassElem key={currentClassIndex} classGroup={courses[currentClassIndex]}/>}
					</div>
			</main>
		</LayoutProf>
	);
};

export default Dashboard;