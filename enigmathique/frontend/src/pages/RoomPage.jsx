import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import LayoutProf from '../layouts/LayoutProf';
import RoomModel from "../models/room.model";
import Room from "../components/createGame/step2/Room";
import RoomNav from "../components/createGame/step2/RoomNav";
import ContentHeader from "../components/dashboard/ContentHeader";
import SearchInput from "../components/SearchInput";
import PropTypes from "prop-types";

const RoomPage = () => {
	const [rooms, setRooms] = useState([]);
	const loadRooms = async () => {
		const data = await RoomModel.getAll();
		setRooms(data);
	}

	const [filteredRooms, setFilteredRooms] = useState([]);
	const [filter, setFilter] = useState({chapter: 'suites', text: ''});
	const navigate = useNavigate();

	useEffect(() => {
		loadRooms();
	}, []);

	useEffect(() => {
		const filtered = rooms.filter(
			(room) => room.chapter === filter.chapter && room.name.toLowerCase().includes(filter.text.toLowerCase())
		);
		setFilteredRooms([...filtered]);
	}, [filter, rooms]);

	const handleRoomSelection = (room) => {
		navigate(`/game/${room.name}`);
	}

	return (
		<LayoutProf>
			<main className="flex flex-col overflow-y-hidden">
				<ContentHeader title="" link='/dashboard'>
						<SearchInput handleChangeText={(e) => (setFilter({...filter, text: e.target.value}))}/>
						<RoomNav
							chapterChange={(e) => (setFilter({...filter, chapter: e.target.value}))}
							filter={filter}
						/>
				</ContentHeader> 

				<section className='room-list-container'>
					{filteredRooms.map((room, index) => (
							<>
								<Room
									index={index}
									name={room.name}
									difficulty={room.difficulty}
									riddles={999}
									winrate={999}
									handleRoomSelection={() => handleRoomSelection(room)}
								/>
							</>
						))
					}
				</section>
			</main>
		</LayoutProf>
	);
}
/**
 * <Mafs
 *         viewBox={{ x: [-10, 10], y: [-2, 2] }}>
 *       <Coordinates.Cartesian />
 *         </Mafs>
 */

export default RoomPage;