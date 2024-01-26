import React, {useEffect, useState} from 'react';
import {useCreationGameContext} from 'components/contexts/CreationGame.context';
import 'index.css';
import { useNavigate } from 'react-router-dom';
import RoomNav from 'components/createGame/step2/RoomNav';
import Room from 'components/createGame/step2/Room';
import PropTypes from 'prop-types';
import GameModel from 'models/game.model';
import ContentHeader from 'components/dashboard/ContentHeader';
import FooterButtons from 'components/createGame/FooterButtons';
import SearchInput from 'components/SearchInput';
import toast from 'react-hot-toast';

/**
 * Composant de la deuxième étape de la création de partie
 * @param props
 * @returns {Element}
 * @constructor
 */
const CreationGame2 = (props) => {

	const {formData, setFormData, rooms} = useCreationGameContext();

	const [filteredRooms, setFilteredRooms] = useState([]);
	const [selectedRooms, setSelectedRooms] = useState([]);
	const [filter, setFilter] = useState({chapter: 'fonctions', text: ''});
	const navigate = useNavigate();


	/**
	 * Filtre les salles en fonction du chapitre et du texte
	 */
	useEffect(() => {
		const filtered = rooms.filter(
			(room) => room.chapter.toLowerCase() === filter.chapter && room.name.toLowerCase().includes(filter.text.toLowerCase())
		);
		setFilteredRooms([...filtered]);
	}, [filter]);
	useEffect(() => {
	}, [selectedRooms]);
	/**
	 * Retourne à l'étape précédente
	 */
	const handlePrecedent = () => {
		props.setStep(1);
	};
	/**
	 * Passe à l'étape suivante
	 * @param event
	 * @returns {Promise<void>}
	 */
	const handleSuivant = async (event) => {
		if (selectedRooms.length === 0) {
			toast.error(
				'Veuillez sélectionner au moins une salle',
			);
			event.preventDefault();
			return;
		}
		
		const game = await createGame();
		await addRooms(game.id, selectedRooms);
		const res = await openGame(game.id);
		navigate(`/pregame/${res.gameCode}`);
		event.preventDefault();
	};
	/**
	 * Crée une partie
	 * @returns {Promise<GameModel|undefined>}
	 */
	const createGame = async () => {
		//return await GameService.createGame(formData.course, formData.gameName, formData.teamSize);
		return await GameModel.create(formData.course, formData.gameName, formData.teamSize);
	};
	/**
	 * Ajoute des salles à une partie
	 * @param gameId
	 * @param roomsIds
	 * @returns {Promise<*|undefined>}
	 */
	const addRooms = async (gameId, roomsIds) => {
		//return await GameService.addRooms(gameId, roomsIds);
		return await GameModel.addRooms(gameId, roomsIds);
	};
	/**
	 * Ouvre une partie
	 * @param gameId
	 * @returns {Promise<*|undefined>}
	 */
	const openGame = async (gameId) => {
		//return await GameService.openGame(gameId);
		return await GameModel.openGame(gameId);
	};
	/**
	 * Gère la sélection des salles
	 * @param roomName
	 */
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
					selectedFilter={filter}
				/>
			</ContentHeader>

			<article className='room-list-container'>
				{filteredRooms.map((room, index) => {
					return(
						room.chapter.toLowerCase() === filter.chapter && room.name.toLowerCase().includes(filter.text.toLowerCase()) &&
							<Room
								key={index}
								index={index}
								room={room}
								handleRoomSelection={handleRoomSelection}
								selected={selectedRooms.includes(room.name)}
								selectOption={true}
							/>
					);
				})}
			</article>

			<FooterButtons linkRetour='' handleRetour={handlePrecedent} handleSuivant={handleSuivant}/>

		</section>
	);
};

CreationGame2.propTypes = {
	setStep: PropTypes.func.isRequired,
};
export default CreationGame2;