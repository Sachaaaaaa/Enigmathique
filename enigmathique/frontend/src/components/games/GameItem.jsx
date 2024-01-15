import React from "react";
import PropTypes from "prop-types";

const GameItem = (props) => {
	return(
		<section className='flex flex-row items-center w-full text-xl py-8'>
			<p className='w-[25%]'>{props.name}</p>
			<p className='w-[15%]'>{props.date}</p>
			<p className='w-[25%]'>{props.course}</p>
			<p className='w-[20%]'>{props.winrate}</p>
			<p className='w-[10%]'>{props.numberRoom}</p>
			<div className='flex flex-row justify-evenly w-[15%] text-white'>
				<button className='bg-[#fcc43e] w-10 h-10 rounded-full'>
				</button>
				<button className='bg-[#0a06f4] w-10 h-10 rounded-full'>
				</button>
			</div>
		</section>
	);
}
GameItem.propTypes = {
	name: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	course: PropTypes.string.isRequired,
	winrate: PropTypes.number.isRequired,
	numberRoom: PropTypes.number.isRequired,
}
export default GameItem;