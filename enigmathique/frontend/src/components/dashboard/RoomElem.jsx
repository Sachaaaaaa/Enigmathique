// RoomElem.jsx:
import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const RoomElem = (props) => {
	return (
		<article className='info-container'>
			<figure className='relative h-40 bg-blue-500 rounded-t-[30px]'
					style={{
						backgroundImage: `url(${props.room.image})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}>
				<figcaption className='absolute text-white font-bold bottom-2 left-4'>{props.room.name}</figcaption>
			</figure>
			<div className='flex-grow flex flex-col justify-between'>
				<div className='p-1 flex justify-around items-center'>
					<article className='elem-dashboard'>
						<h3 className='small-title'>Chapitre</h3>
						<p className='small-text'>{props.room.cat}</p>
					</article>
					<article className='elem-dashboard '>
						<h3 className='small-title'>Difficulté</h3>
						<p className='small-text'>{props.room.difficulty}</p>
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
