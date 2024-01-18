import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const GameTeam = (props) => {

	const rooms = props.rooms;

	const timeToInt = (time) => {
		const splitTime = time.split(':');
		return parseInt(splitTime[0]) * 60 + parseInt(splitTime[1]);
	}

	const secondsToTime = (seconds) => {
		const minAndSec = [Math.floor(seconds/60), seconds%60];
		return minAndSec[0].toString().concat(':',minAndSec[1].toString());
	}

	const data = {
		labels: rooms.map((room) => (room.name)),
		datasets: [
			{
			label: 'Temps par salle',
			data: rooms.map((room) => (timeToInt(room.time)))
		}
		]
	}

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<h3>Temps de jeu</h3>
			</div>
			<div>
				<ul>
					{rooms.map((room, index) => (
						<li key={index}>{room.name}<span>{room.time}</span></li>
					))}
				</ul>
				<Doughnut data={data} title='salut'/>
			</div>
		</div>
	)
}

GameTeam.propTypes = {
	rooms: PropTypes.array.isRequired
}

export default GameTeam;