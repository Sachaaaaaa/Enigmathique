import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import LayoutProf from '../layouts/LayoutProf';
import RoomModel from "../models/room.model";
import Room from "../components/createGame/2/Room";
import RoomNav from "../components/createGame/2/RoomNav";
import ContentHeader from "../components/dashboard/ContentHeader";
import SearchInput from "../components/SearchInput";
import PropTypes from "prop-types";

const RoomList = () => {
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
		console.log(rooms);
		const filtered = rooms.filter(
			(room) => room.chapter === filter.chapter && room.name.toLowerCase().includes(filter.text.toLowerCase())
		);
		setFilteredRooms([...filtered]);
	}, [filter, rooms]);

	//TODO redirection à refaire
	const handleRoomSelection = (room) => {
		navigate(`/game/${room.name}`);
	}

	return (
		<LayoutProf>
			<main className='h-screen bg-main-color overflow-auto'>
				<ContentHeader title="" link='/dashboard'>
						<SearchInput handleChangeText={(e) => (setFilter({...filter, text: e.target.value}))}/>
						<RoomNav
							chapterChange={(e) => (setFilter({...filter, chapter: e.target.value}))}
							filter={filter}
						/>
				</ContentHeader> 

				<section className='flex flex-col w-full h-[78%] overflow-y-scroll pr-4'>
					{filteredRooms.map((room, index) => (
							<>
								<Room
									key={index}
									name={room.name}
									difficulty={room.difficulty}
									riddles={999}
									winrate={999}
									handleRoomSelection={() => handleRoomSelection(room)}
								/>
								{index !== filteredRooms.length - 1 && <hr></hr>}
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


RoomList.propTypes = {
	setStep: PropTypes.func.isRequired,
}
export default RoomList;