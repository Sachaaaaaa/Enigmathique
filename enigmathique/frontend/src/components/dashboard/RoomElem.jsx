// RoomElem.jsx:
import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const RoomElem = (props) => {

	const room = props.room;

	return (
		<article className='info-container'>
			<figure className='relative h-40 bg-blue-500 rounded-t-[30px]'
					style={{
						backgroundImage: `url(${require('../../assets/img/room-img/'+room.name+'.png')})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}>
				<figcaption className='absolute text-white font-bold bottom-2 left-4'>{room.name}</figcaption>
			</figure>
			<div className='flex-grow flex flex-col justify-between'>
				<div className='p-1 flex justify-around items-center'>
					<article className='element-info-container'>
						<h3 className='small-title'>Chapitre</h3>
						<p className='small-text'>{room.chapter}</p>
					</article>
					<article className='element-info-container'>
						<h3 className='small-title'>Difficulté</h3>
						<p className='small-text'>{room.difficulty}</p>
					</article>
				</div>
				<Link to='' className='btn-show'>
					Voir
				</Link>
			</div>
		</article>
	)
}

RoomElem.propTypes = {
	room: PropTypes.object.isRequired
}

export default RoomElem;
