import React, {useState} from "react";
import PropTypes from "prop-types";
import {FaSearch} from 'react-icons/fa';
import '../createGame.css'
import {IconContext} from 'react-icons';
import { FaPuzzlePiece, FaMedal  } from "react-icons/fa";
import toast from "react-hot-toast";


const Room = (props) => {

	const [selected, setSelected] = useState(props.selected);
	const handleChange = () => {
		props.handleRoomSelection(props.name);
		setSelected(!selected);
		if (selected) {
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

	const difficulty = props.difficulty.toLowerCase();

	const roomElemClass = 'flex items-center gap-3 py-4 ' ;

	return(
		<label htmlFor={"roomselect"+props.index}  className={`flex items-center justify-between h-fit w-full min-w-max gap-10 pl-5
							border-t border-[#CECDFD] ${props.index % 2 == 0 ? 'bg-[#EBECF9]' : 'bg-[#F1F3FA]'}`}>
			
			<article className={roomElemClass}>
				<img
					className='rounded-xl'
					width={150}
					src={require('../../../assets/img/room-img/'+props.name+'.png')}
					alt='room-img'
				/>

				<div className='flex flex-col justify-evenly items-start'>
					<div className={difficultyChip[difficulty]}>
						{props.difficulty}
					</div>
					<h1 className='primary-font-color text-lg font-medium '>{props.name}</h1>
				</div>
			</article>

			<article className={roomElemClass}>
				<FaPuzzlePiece size={30} className="blue-font-color"/>
				<div className='flex flex-col'>
					<span className='primary-font-color font-bold'>{props.riddles}</span>
					<span className='nav-font-color'>Énigmes</span>
				</div>
			</article>

			<article className={roomElemClass}>
				<FaMedal size={30} className="blue-font-color"/>
				<div className='flex flex-col'>
					<span className='primary-font-color font-bold'>{props.winrate}%</span>
					<span className='nav-font-color'>Taux de réussite</span>
				</div>
			</article>
			<article className={`flex justify-end items-center h-full pr-4 border-r-[5px] ${selected ? ' border-blue-color':'border-transparent'}`}>
				<input  id={"roomselect"+props.index} size={100} checked={props.selected} type='checkbox' onChange={handleChange}/>
			</article>
		</label>
	);
}
Room.propTypes = {
	index: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	difficulty: PropTypes.string.isRequired,
	riddles: PropTypes.number.isRequired,
	winrate: PropTypes.number.isRequired,
	handleRoomSelection: PropTypes.func,
	selected: PropTypes.bool.isRequired,
}

export default Room;