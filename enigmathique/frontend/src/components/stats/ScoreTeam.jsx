import React, {useState} from 'react';
import PropTypes from 'prop-types';

const ScoreTeam = (props) => {

	const rooms = props.rooms;

	const [option, setOption] = useState('global');

	const handleOption = (e) => {
		setOption(e.target.value);
	}

	const getRoom = (roomName, rooms) => {
		if(roomName === 'global') {
			return {
				name: 'global',
				time: secondsToTime(rooms.reduce((sum, room) => sum + timeToInt(room.time))),
				score: {
					nbHints: rooms.reduce((sum, room) => (sum + room.score.nbHints), 0),
					nbMis: rooms.reduce((sum, room) => (sum + room.score.nbMis), 0)
				}
			}
		} else {
			let i = 0;
			let theRoom = rooms[i];
			while (theRoom.name !== roomName) {
				i++;
				theRoom = rooms[i];
			}
			return theRoom;
		}
	}

	const timeToInt = (time) => {
		const splitTime = time.split(':');
		return parseInt(splitTime[0]) * 60 + parseInt(splitTime[1]);
	}

	const secondsToTime = (seconds) => {
		const minAndSec = [Math.floor(seconds/60), seconds%60]
		return minAndSec[0].toString().concat(':',minAndSec[1].toString())
	}

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<div>
				<h3>Score</h3>
					<select onChange={handleOption}>
						<option value='global'>Global</option>
						{rooms.map((room, index) => (
							<option key={index} value={room.name}>{room.name}</option>
						))}
					</select>
				</div>
			</div>
			<div>
				<section>
					<img src='' alt='logo'/>
					<p>Indices utilisés</p>
					<p>{getRoom(option, rooms).score.nbHints}</p>
				</section>
				<section>
					<img src='' alt='logo'/>
					<p>Erreurs commises</p>
					<p>{getRoom(option, rooms).score.nbMis}</p>
				</section>
				<section>
					<img src='' alt='logo'/>
					<p>Salles réussies</p>
					<p>-1 sur {rooms.length}</p>
				</section>
			</div>
		</div>
	)
}

ScoreTeam.propTypes = {
	rooms: PropTypes.array.isRequired
}

export default ScoreTeam;