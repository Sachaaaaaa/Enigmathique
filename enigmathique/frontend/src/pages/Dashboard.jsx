import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import ClassElem from '../components/dashboard/ClassElem';
import RoomElem from '../components/dashboard/RoomElem';
import GameElem from '../components/dashboard/GameElem';
import {randInt} from 'three/src/math/MathUtils';
import LayoutProf from '../layouts/LayoutProf';
import { FaAngleLeft } from 'react-icons/fa6';
import { FaAngleRight } from 'react-icons/fa6';


const Dashboard = () => {

	const rooms = [
		{
			name: 'Room1',
			difficulty: 'facile',
			cat: 'Probabilités',
			image: require('../assets/img/room-img/room-fonction-1.png')
		},
		{
			name: 'Room2',
			difficulty: 'moyen',
			cat: 'Suites',
			image: require('../assets/img/room-img/room-proba-1.png')
		},
		{
			name: 'Room3',
			difficulty: 'difficile',
			cat: 'Fonctions',
			image: require('../assets/img/room-img/room-fonction-1.png')
		}
	];

	const games = [
		{
			name: 'Entrainement probabilités',
			date: '17/11/23',
			className: 'A',
			winners: ['Julie Lustret', 'Monstre Gentil'],
			winRate: 80
		},
		{
			name: 'Entrainement fonct',
			date: '11/12/23',
			className: 'A',
			winners: ['Lucas Crespin', 'Girafe Agréable'],
			winRate: 75
		}
	];

	const classGroups = [
		{
			name: 'A',
			nbStudents: 32,
			lastGame: '11/12/23',
			nbGames: 4,
			winRate: 80
		},
		{
			name: 'B',
			nbStudents: 31,
			lastGame: '23/10/23',
			nbGames: 3,
			winRate: 75
		}
	];

	// Choix des salles à afficher
	const roomSelection = (rooms) => {
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
		return roomSelect;
	};

	// Ajout d'un état pour les salles sélectionnées
	const [selectedRooms, setSelectedRooms] = useState([]);


	useEffect(() => {
		setSelectedRooms(roomSelection(rooms));
	}, []); // s'éxécute seulement au montage


	// Ajout d'un état pour suivre l'indice de la classe actuelle
	const [currentClassIndex, setCurrentClassIndex] = useState(0);

	// Fonction pour aller à la classe précédente
	const prevClass = () => {
		setCurrentClassIndex(prevIndex =>
			prevIndex > 0 ? prevIndex - 1 : classGroups.length - 1
		);
	};

	// Fonction pour aller à la classe suivante
	const nextClass = () => {
		setCurrentClassIndex(prevIndex =>
			prevIndex < classGroups.length - 1 ? prevIndex + 1 : 0
		);
	};

	return (
		<LayoutProf>
			<main className='flex flex-grow bg-[#F5F7FA] flex-wrap overflow-y-scroll'>
				<div className='flex'>
					<div className='flex-grow mr-2 flex-wrap max-w-[1000px]'>
						<div className='flex-grow p-5'>
							<div className='flex justify-between'>
								<h2 className='block font-semibold'>Mes Parties</h2>
								<Link to='' className='block font-semibold hover:underline'>Voir tout</Link>
							</div>
							<div className='flex justify-between'>
								{games.map((game, index) => (
									<GameElem key={index} game={game}/>
								))}
							</div>
						</div>
						<div className='flex-grow p-5'>
							<div className='flex justify-between'>
								<h2 className='block font-semibold'>Proposition de salles</h2>
								<Link to='' className='block font-semibold hover:underline'>Voir tout</Link>
							</div>
							<div className='flex justify-between'>
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
						<div className='w-[48vw] xl:max-w-lg mx-auto p-5'>
							<ClassElem key={currentClassIndex} classGroup={classGroups[currentClassIndex]}/>
						</div>
					</div>
				</div>
			</main>
		</LayoutProf>
	);
};

export default Dashboard;