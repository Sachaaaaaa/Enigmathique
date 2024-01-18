import React, {useState} from 'react';
import PropTypes from 'prop-types';

const maxTime = 600;

const ScoreTeam = (props) => {

	const scores = props.scores;

	const [option, setOption] = useState('global');

	const handleOption = (e) => {
		setOption(e.target.value);
	}

	const getRoom = (roomName, scores) => {
		if(roomName === 'global') {
			return {
				idTeam: scores[0].idTeam,
				roomName: 'global',
				idGame: scores[0].idGame,
				time: scores.reduce((sum, score) => {sum+score.time}),
				nbGoodAnswers: scores.reduce((sum, score) => {sum+score.nbGoodAnswers}),
				nbBadAnswers: scores.reduce((sum, score) => {sum+score.nbBadAnswers}),
				nbHints: scores.reduce((sum, score) => {sum+score.nbHints}),
				createdAt: scores[0].createdAt,
				updatedAt: scores[0].updatedAt
			}
		} else {
			let i = 0;
			let theScore = scores[i];
			while (theScore.roomName !== roomName) {
				i++;
				theScore = scores[i];
			}
			return theScore;
		}
	}

	return (
		<div>
			<div>
				<span>Statistiques</span>
				<div>
				<h3>Score</h3>
					<select onChange={handleOption}>
						<option value='global'>Global</option>
						{scores.map((score, index) => (
							<option key={index} value={score.roomName}>{score.roomName}</option>
						))}
					</select>
				</div>
			</div>
			<div>
				<section>
					<img src='' alt='logo'/>
					<p>Indices utilisés</p>
					<p>{getRoom(option, scores).nbHints}</p>
				</section>
				<section>
					<img src='' alt='logo'/>
					<p>Erreurs commises</p>
					<p>{getRoom(option, scores).nbBadAnswers}</p>
				</section>
				<section>
					<img src='' alt='logo'/>
					<p>Salles réussies</p>
					<p>{scores.reduce((sum, score) => {score.time < maxTime && sum++} )} sur {scores.length}</p>
				</section>
			</div>
		</div>
	)
}

ScoreTeam.propTypes = {
	scores: PropTypes.array.isRequired
}

export default ScoreTeam;