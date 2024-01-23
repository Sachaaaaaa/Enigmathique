import React, {useEffect, useState} from 'react';
import {useCreationGameContext} from '../../contexts/CreationGame.context';
import '../../../index.css';
import { useNavigate } from 'react-router-dom';
import RoomNav from "./RoomNav";
import Room from "./Room";
import PropTypes from "prop-types";
import Game from "../../../models/game.model";
import ContentHeader from 'components/dashboard/ContentHeader';
import FooterButtons from '../FooterButtons';
import SearchInput from "../../SearchInput";
import toast from "react-hot-toast";

const CreationGame2 = (props) => {

	const {formData, setFormData, rooms} = useCreationGameContext();

	const [filteredRooms, setFilteredRooms] = useState([]);
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [filter, setFilter] = useState({chapter: 'fonctions', text: ''});
	const navigate = useNavigate();



	useEffect(() => {
		const filtered = rooms.filter(
			(room) => room.chapter === filter.chapter && room.name.toLowerCase().includes(filter.text.toLowerCase())
		);
		setFilteredRooms([...filtered]);
	}, [filter]);
	useEffect(() => {
		console.log(selectedRooms);
	}, [selectedRooms]);

	const handlePrecedent = () => {
		props.setStep(1);
	};

	const handleSuivant = async (event) => {
		if (selectedRooms.length === 0) {
			toast.error(
				'Veuillez sélectionner au moins une salle',
				);
			event.preventDefault();
			return;
		}
		if (confirm('Les informations entrées sont exactes ?')) {
			const game = await createGame();
			await addRooms(game.id, selectedRooms);
			const res = await openGame(game.id);
			console.log(res.gameCode);
			navigate(`/pregame/${res.gameCode}`);

			return;
		}
		event.preventDefault();
	};

	const createGame = async () => {
		//return await GameService.createGame(formData.course, formData.gameName, formData.teamSize);
		return await Game.create(formData.course, formData.gameName, formData.teamSize)
	}
	const addRooms = async (gameId, roomsIds) => {
		//return await GameService.addRooms(gameId, roomsIds);
		return await Game.addRooms(gameId, roomsIds);
	}
	const openGame = async (gameId) => {
		//return await GameService.openGame(gameId);
		return await Game.openGame(gameId);
	}

	const handleRoomSelection = (roomName) => {
		if (selectedRooms.includes(roomName)) {
			setSelectedRooms(selectedRooms.filter((name) => name !== roomName));
		} else {
			setSelectedRooms([...selectedRooms, roomName]);
		}
	};

	return (
		<section className='flex flex-col w-full h-[calc(100%-26px)] overflow-y-hidden'>
			<ContentHeader title='Sélection des salles' onClick={handlePrecedent}>
				<SearchInput handleChangeText={(e) => (setFilter({...filter, text: e.target.value}))}/>
				<RoomNav
					chapterChange={(e)=> (setFilter({...filter, chapter: e.target.value}))}
					filter={filter}
				/>
			</ContentHeader>

			<article className='room-list-container'>
				{filteredRooms.map((room, index) => {
					return(
						room.chapter === filter.chapter && room.name.toLowerCase().includes(filter.text.toLowerCase()) &&
							<Room
								index={index}
								room={room}
								handleRoomSelection={handleRoomSelection}
								selected={selectedRooms.includes(room.name)}

							/>
					);
				})}
			</article>

			<FooterButtons linkRetour='' handleRetour={handlePrecedent} handleSuivant={handleSuivant}/>

		</section>
	)
};

CreationGame2.propTypes = {
	setStep: PropTypes.func.isRequired,
}
export default CreationGame2;