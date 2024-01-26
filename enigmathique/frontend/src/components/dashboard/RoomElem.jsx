// RoomElem.jsx:
import {Link} from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import InfoBlockElem from './InfoBlockElem';

const RoomElem = (props) => {

	const room = props.room;

	return (
		// Affichage des informations de la salle
		// Grid pour afficher les informations sur 2 colonnes fixes
		<article className='info-block grid-block'>
			<figure className='col-span-2 relative h-[150px] rounded-t-[8px]'
					style={{
						backgroundImage: `url(${require('../../assets/img/room-img/'+room.name+'.png')})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}}>
				<figcaption className='absolute text-white font-bold bottom-2 left-4'>{room.name}</figcaption>
			</figure>

			<InfoBlockElem title='Chapitre' text={room.chapter}/>

			<InfoBlockElem title='Difficulté' text={room.difficulty}/>

			<Link to='/rooms' className='col-span-2 btn-show'>
				Voir
			</Link>
		</article>
	)
}

RoomElem.propTypes = {
	room: PropTypes.object.isRequired
}

export default RoomElem;
