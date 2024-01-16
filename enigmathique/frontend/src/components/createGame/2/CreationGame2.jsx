import React, {useEffect, useState} from 'react';
import {initialFilterData, initialFormData, useCreationGameContext} from '../../contexts/CreationGame.context';
import '../../../index.css';
import { useNavigate } from 'react-router-dom';
import RoomNav from "./RoomNav";
import Room from "./Room";
import GameService from "../../../services/game.service";
import PropTypes from "prop-types";
const CreationGame2 = (props) => {

	const {formData, setFormData, rooms} = useCreationGameContext();

	const [filteredRooms, setFilteredRooms] = useState([]);
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [filter, setFilter] = useState({chapter: 'suites', text: ''});
	const navigate = useNavigate();



	useEffect(() => {
		const filtered = rooms.filter(
			(room) => room.chapter === filter.chapter && room.name.toLowerCase().includes(filter.text.toLowerCase())
		);
		setFilteredRooms([...filtered]);
	}, [filter]);


	const handlePrecedent = () => {
		props.setStep(1);
	}

	const handleSuivant = async (event) => {
		if (selectedRooms.length === 0) {
			alert('Veuillez sélectionner au moins une salle');
			event.preventDefault();
			return;
		}
		if (confirm("Les informations entrées sont exactes ?")) {
			const game = await createGame();
			await addRooms(game.id, selectedRooms);
			const code = await openGame(game.id);
			console.log(code)
			navigate(`/pregame/${code.code}`);

			return;
		}
		event.preventDefault();
	}

	const createGame = async () => {
		return await GameService.createGame(formData.course, formData.gameName, formData.teamSize);
	}
	const addRooms = async (gameId, roomsIds) => {
		return await GameService.addRooms(gameId, roomsIds);
	}
	const openGame = async (gameId) => {
		return await GameService.openGame(gameId);
	}

	const handleRoomSelection = (roomName) => {
		if (selectedRooms.includes(roomName)) {
			setSelectedRooms(selectedRooms.filter((name) => name !== roomName));

		} else {
			setSelectedRooms([...selectedRooms, roomName]);
		}
	}

	return (
		<section className='flex flex-col h-[96%] w-full gap-4'>
			<section className='h-[5%]'>
				<h1 className='text-2xl pl-4'>Sélection des salles</h1>
			</section>

			<RoomNav
				chapterChange={(e)=> (setFilter({...filter, chapter: e.target.value}))}
				textChange={(e)=>(setFilter({...filter, text: e.target.value}))}
				filter={filter}
			/>
			<section className='flex flex-col w-full h-[78%] overflow-y-scroll pr-4'>
				{filteredRooms.map((room, index) => {
					return(
						room.chapter === filter.chapter && room.name.toLowerCase().includes(filter.text.toLowerCase()) &&
							<>
								<Room
									key={index}
									name={room.name}
									difficulty={room.difficulty}
									riddles={999}
									winrate={999}
									handleRoomSelection={handleRoomSelection}
								/>
								{index!==filteredRooms.length-1 && <hr></hr>}
							</>
					);
				})}
			</section>

			<section className="flex flex-row justify-evenly items-end className='h-[10%]' w-full">
				<button
					className='btn-cancel'
					type='submit'
					onClick={handlePrecedent}
				>
					Retour
				</button>
				{/*<Link className='btn-validate' to='/pregame/AG874AJ' onClick={handleSuivant}>*/}
				{/*	Suivant*/}
				{/*</Link>*/}
				<button onClick={handleSuivant}>
					Suivant
				</button>
			</section>

		</section>
	)
};

CreationGame2.propTypes = {
	setStep: PropTypes.func.isRequired,
}
export default CreationGame2;