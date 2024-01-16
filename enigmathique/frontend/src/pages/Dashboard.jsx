import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ClassElem from '../components/dashboard/ClassElem';
import RoomElem from '../components/dashboard/RoomElem';
import GameElem from '../components/dashboard/GameElem';
import {randInt} from 'three/src/math/MathUtils';
import LayoutProf from '../layouts/LayoutProf';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';
import GameService from '../services/game.service';
import Course from '../models/course.model';
import RoomService from "../services/room.service";


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
		console.log(data);
	}

	useEffect(() => {
		loadClasses();
	}, []);

	const loadGames = () => {
		GameService.getAll().then((response) => {
			setGames(response);
		}).catch((error) => {
			console.log(error);
		});
	}

	useEffect(() => {
		loadGames();
	}, []);

	// Choix des salles à afficher
	const roomSelection = () => {
		//TODO: régler le problème de chargement
		loadRooms();
		if(rooms.length > 2) {
			let max = rooms.length - 1;
			let roomSelect = [];
			let selectedIndex = -1;
			for(let i = 0; i < 2; i++) {
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

	const loadRooms = () => {
		RoomService.getAllRooms().then((response) => {
			setRooms(response);
		}).catch((error) => {
			console.log(error);
		});
	}


	useEffect(() => {
		roomSelection();
	}, []); // s'éxécute seulement au montage


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

	return (
		<LayoutProf>
			<main className='flex bg-[#F5F7FA] flex-wrap overflow-y-scroll'>
					<div className='w-[45svw] min-w-[280px] mr-2 flex-wrap'>
						<div className='flex flex-col p-5'>
							<div className='flex justify-between w-full min-w-[280px]'>
								<h2 className='font-semibold'>Mes Parties</h2>
								<Link to='' className='text-sm font-semibold hover:underline'>Voir tout</Link>
							</div>
							<div className='w-full flex flex-wrap justify-between items-center gap-1'>
								{games.slice(-2).map((game, index) => (
									<GameElem key={index} game={game}/>
								))}
							</div>
						</div>
						<div className='flex flex-col p-5 pt-2'>
							<div className='flex justify-between  w-full min-w-[280px]'>
								<h2 className='font-semibold'>Proposition de salles</h2>
								<Link to='' className='text-sm font-semibold hover:underline'>Voir tout</Link>
							</div>
							<div className='w-full flex flex-wrap justify-between items-center gap-1'>
								{selectedRooms.map((room, index) => (
									<RoomElem key={index} room={room}></RoomElem>
								))}
							</div>
						</div>
					</div>
					<div className='flex-warp p-5'>
						<div className='flex justify-between items-center'>
							<h2 className='block font-semibold'>Mes Classes</h2>
							<div>
								<button onClick={prevClass}><FaAngleLeft /></button>
								<button onClick={nextClass}><FaAngleRight /></button>
							</div>
						</div>
						{/* Afficher seulement la classe actuellement sélectionnée */}
						<div>
							{courses.length !== 0 && <ClassElem key={currentClassIndex} classGroup={courses[currentClassIndex]}/>}
						</div>
					</div>
			</main>
		</LayoutProf>
	);
};

export default Dashboard;