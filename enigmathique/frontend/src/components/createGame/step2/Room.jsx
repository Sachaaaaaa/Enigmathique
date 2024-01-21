import React, {useState} from "react";
import PropTypes from "prop-types";
import {FaSearch} from 'react-icons/fa';
import '../createGame.css'
import {IconContext} from 'react-icons';


const Room = (props) => {

	const [selected, setSelected] = useState(false);
	const handleChange = () => {
		props.handleRoomSelection(props.name);
		setSelected(!selected);
	}
	return(
		<IconContext.Provider value={{className: 'h-1/4 w-1/4 blue-font-color'}}>
		<label className='room-container'>
			<div className='flex flex-row h-full w-11/12 gap-4'>
				<div className='h-full w-[10%] overflow-hidden p-2'>
					<img
						className='rounded-xl'
						src={require('../../../assets/img/room-img/'+props.name+'.png')}
						alt='room-img'
					/>
				</div>
				<section className='flex flex-col justify-evenly items-start w-[30%]'>
					<div className={`chip-${props.difficulty.toLowerCase()}`}>
						{props.difficulty}
					</div>
					<h1 className='text-xl'>{props.name}</h1>
				</section>
				<section className='flex flex-row gap-4 justify-start items-center w-[20%]'>
					<FaSearch/>
					<div className='flex flex-col justify-evenly items-start'>
						<span className='blue-font-color font-bold'>{props.riddles}</span>
						<span className='text-gray-400'>Énigmes</span>
					</div>
				</section>
				<section className='flex flex-row gap-4 justify-start items-center w-[20%]'>
					<FaSearch/>
					<div className='flex flex-col justify-evenly items-start'>
						<span className='blue-font-color font-bold'>{props.winrate}%</span>
						<span className='text-gray-400'>Taux de réussite</span>
					</div>
				</section>
			</div>
			<section className={`flex flex-col justify-center items-center h-full pr-4 border-r-4 ${selected ? ' border-blue-color':'border-transparent'}`}>
				<input type='checkbox' onChange={handleChange}/>
			</section>
		</label>
		</IconContext.Provider>
	);
}
Room.propTypes = {
	name: PropTypes.string.isRequired,
	difficulty: PropTypes.string.isRequired,
	riddles: PropTypes.number.isRequired,
	winrate: PropTypes.number.isRequired,
	handleRoomSelection: PropTypes.func,
}

export default Room;