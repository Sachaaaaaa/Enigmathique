import React from 'react';
import PropTypes from 'prop-types';

const RoomItem = (props) => {
	return (
		<section>
			<img src='' alt='img-room'/>
			<h2>{props.name}</h2>
			<p>Difficulté : {props.difficulty}</p>
		</section>
	)
}

RoomItem.propTypes = {
	name: PropTypes.string.isRequired,
	difficulty: PropTypes.string.isRequired
}

export default RoomItem;