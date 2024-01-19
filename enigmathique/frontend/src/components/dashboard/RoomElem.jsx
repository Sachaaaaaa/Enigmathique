// RoomElem.jsx:
import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

const RoomElem = (props) => {

	const room = props.room;

	return (
		<article className='grid grid-cols-2 gap-1 info-container'>
			<figure className='col-span-2 relative h-[120px] rounded-t-[30px]'
					style={{
						/*TODO: obtenir la bonne image*/
						backgroundImage: `url(${require('../../assets/img/room-img/'+room.name+'.png')})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}>
				<figcaption className='absolute text-white font-bold bottom-2 left-4'>{room.name}</figcaption>
			</figure>
			<article className='col-span-1 element-info-container'>
				<h3 className='small-title'>Chapitre</h3>
				<p className='small-text'>{room.chapter}</p>
			</article>
			<article className='col-span-1 element-info-container'>
				<h3 className='small-title'>Difficulté</h3>
				<p className='small-text'>{room.difficulty}</p>
			</article>
			<Link to='' className='col-span-2 btn-show'>
				Voir
			</Link>
		</article>
	)
}

RoomElem.propTypes = {
	room: PropTypes.object.isRequired
}

export default RoomElem;
