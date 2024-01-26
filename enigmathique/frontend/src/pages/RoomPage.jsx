import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LayoutProf from 'layouts/LayoutProf';
import RoomModel from 'models/room.model';
import Room from 'components/createGame/step2/Room';
import RoomNav from 'components/createGame/step2/RoomNav';
import ContentHeader from 'components/dashboard/ContentHeader';
import SearchInput from 'components/SearchInput';

/**
 * Page des salles d'énigmes
 * @returns {Element}
 * @constructor
 */
const RoomPage = () => {
	const [rooms, setRooms] = useState([]);
	/**
	 * Charge les salles d'énigmes
	 * @returns {Promise<void>}
	 */
	const loadRooms = async () => {
		const data = await RoomModel.getAll();
		setRooms(data);
	};

	const [filteredRooms, setFilteredRooms] = useState([]);
	const [filter, setFilter] = useState({chapter: 'fonctions', text: ''});
	const navigate = useNavigate();

	/**
	 * useEffect pour charger les salles d'énigmes au chargement de la page
	 */
	useEffect(() => {
		loadRooms();
	}, []);
	/**
	 * useEffect pour filtrer les salles d'énigmes
	 */
	useEffect(() => {
		const filtered = rooms.filter(
			(room) => room.chapter.toLowerCase() === filter.chapter && room.name.toLowerCase().includes(filter.text.toLowerCase())
		);
		setFilteredRooms([...filtered]);
	}, [filter, rooms]);

	/**
	 * Gère la sélection d'une salle d'énigme
	 * @param room
	 */
	const handleRoomSelection = (room) => {
		navigate(`/game/${room.name}`);
	};

	return (
		<LayoutProf title="Salles d'énigmes">
			<main className="flex flex-col overflow-y-hidden">
				<ContentHeader link='/dashboard'>
					<SearchInput handleChangeText={(e) => (setFilter({...filter, text: e.target.value}))}/>
					<RoomNav
						chapterChange={(e) => (setFilter({...filter, chapter: e.target.value}))}
						selectedFilter={filter}
					/>
				</ContentHeader> 

				<section className='room-list-container'>
					{filteredRooms.map((room, index) => (
						<>
							<Room
								key={index}
								index={index}
								room={room}
								selectOption={false}
								handleRoomSelection={() => handleRoomSelection(room)}
							/>
						</>
					))
					}
				</section>
			</main>
		</LayoutProf>
	);
};

export default RoomPage;