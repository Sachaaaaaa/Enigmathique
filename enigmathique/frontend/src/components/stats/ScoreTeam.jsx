import React from 'react';
import PropTypes from 'prop-types';

const ScoreTeam = (props) => {

	const rooms = props.rooms;

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<div>
				<h3>Score</h3>
					<select>
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
					<p>{props.rooms[0].score.nbHints}</p>
				</section>
				<section>
					<img src='' alt='logo'/>
					<p>Erreurs commises</p>
					<p>{props.rooms[0].score.nbMis}</p>
				</section>
				<section>
					<img src='' alt='logo'/>
					<p>Salles réussies</p>
					<p>-1 sur {props.rooms.length}</p>
				</section>
			</div>
		</div>
	)
}

ScoreTeam.propTypes = {
	rooms: PropTypes.array.isRequired
}

export default ScoreTeam;