import React, {useState} from "react";
import PropTypes from "prop-types";
import {FaSearch} from 'react-icons/fa';
import {IconContext} from 'react-icons';
import { FaPuzzlePiece, FaMedal  } from "react-icons/fa";
import toast from "react-hot-toast";
import { getRowColor } from "components/ListManager";
import ActionButton from "components/dashboard/ActionButton";


const Room = (props) => {

	const { index, room, handleRoomSelection, selectOption, selected } = props;

	const [roomSelected, setSelected] = useState(selected);
	const handleChange = () => {
		handleRoomSelection(room.name);
		setSelected(!roomSelected);
		if (roomSelected) {
			toast.error(
				'La salle a été retirée de la partie',
				{duration: 800}
				);
		} else {
			toast.success(
				'La salle a été ajoutée à la partie',
				{duration: 800}
				);

		}
	}

	
	const difficultyChip = {
		facile: 'chip-facile',
		moyen: 'chip-moyen',
		intermédiaire: 'chip-moyen',
		difficile: 'chip-difficile',
	}
	const difficulty = room.difficulty.toLowerCase();

	const roomElemClass = 'grow flex items-center gap-3 py-4 ' ;

	let htmlForLabel = "";
	let cursorPointer = "";
	let actionElem ;
	if (selectOption) {
		htmlForLabel = "roomselect"+index;
		cursorPointer = "cursor-pointer";
		actionElem = <input  id={"roomselect"+index}  style={{width:"20px",height:"20px"}}  checked={selected} type='checkbox' onChange={handleChange}/>;
	} else {
		htmlForLabel = "";
		cursorPointer = "";
		actionElem = <ActionButton title="Détails" link={`/room/${room.name}`} disabled={true}/>
	}

	return(
		<label htmlFor={htmlForLabel}  className={`flex items-center justify-left h-fit w-full min-w-max gap-6 ${cursorPointer}
											${getRowColor(index)}`}>
			<div className={`w-[5px] h-full ${roomSelected ? ' bg-blue-color':'bg-transparent'}`}></div>

			<article className={roomElemClass}>
				<img
					className='rounded-xl'
					width={150}
					src={require('../../../assets/img/room-img/'+room.name+'.png')}
					alt='room-img'
				/>
				<div className='flex flex-col justify-evenly items-start'>
					<div className={difficultyChip[difficulty]}>
						{room.difficulty}
					</div>
					<h1 className='primary-font-color text-lg font-medium '>{room.name}</h1>
				</div>
			</article>

			<article className={roomElemClass}>
				<FaPuzzlePiece size={30} className="blue-font-color"/>
				<div className='flex flex-col'>
					<span className='primary-font-color font-bold'>N/A</span>
					<span className='nav-font-color'>Énigmes</span>
				</div>
			</article>

			<article className={roomElemClass}>
				<FaMedal size={30} className="blue-font-color"/>
				<div className='flex flex-col'>
					<span className='primary-font-color font-bold'>N/A</span>
					<span className='nav-font-color'>Taux de réussite</span>
				</div>
			</article>
			<article className={`grow flex justify-end items-center h-full pr-4`}>
				{actionElem}
			</article>
		</label>
	);
}
Room.propTypes = {
	index: PropTypes.number.isRequired,
	room : PropTypes.object.isRequired,
	handleRoomSelection: PropTypes.func,
	selected: PropTypes.bool,
	selectOption: PropTypes.bool.isRequired
}

export default Room;