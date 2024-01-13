import React from "react";
import PropTypes from "prop-types";
import {FaSearch} from 'react-icons/fa';
import '../createGame.css'
import {IconContext} from 'react-icons';
import {useCreationGameContext} from '../../contexts/CreationGame.context';


const Room = (props) => {
	const {rooms, setRooms} = useCreationGameContext();
	const handleChange = () => {
		console.log(rooms)
		if (rooms.includes(props.id)) {
			setRooms(rooms.filter((room)=> room !== props.id));
		} else {
			setRooms([...rooms, props.id]);
		}
	}
	return(
		<IconContext.Provider value={{className: 'h-1/4 w-1/4 text-[#0A06F4]'}}>
		<article className="flex flex-row gap-4 w-full h-1/4">
			<img
				className='h-full w-1/4 rounded-xl'
				src={require('../../../assets/img/room-img/room-fonction-1.png')}
				alt='room-img'
			/>
			<section className='flex flex-col justify-evenly items-start w-1/4'>
				<div className={`chip-${props.difficulty.toLowerCase()}`}>
					{props.difficulty}
				</div>
				<h1 className='text-xl'>{props.name}</h1>
			</section>
			<section className='flex flex-row gap-4 justify-start items-center w-1/6'>
				<FaSearch/>
				<div className='flex flex-col justify-evenly items-start'>
					<span className='text-[#0A06F4] font-bold'>{props.riddles}</span>
					<span className='text-gray-400'>Énigmes</span>
				</div>
			</section>
			<section className='flex flex-row gap-4 justify-start items-center w-1/5'>
				<FaSearch/>
				<div className='flex flex-col justify-evenly items-start'>
					<span className='text-[#0A06F4] font-bold'>{props.winrate}%</span>
					<span className='text-gray-400'>Taux de réussite</span>
				</div>
			</section>
			<section className='w-max'>
				<input type='checkbox' onChange={handleChange}/>
			</section>
		</article>
		</IconContext.Provider>
	);
}
Room.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	difficulty: PropTypes.string.isRequired,
	riddles: PropTypes.number.isRequired,
	winrate: PropTypes.number.isRequired,
}

export default Room;