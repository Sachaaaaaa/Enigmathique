import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ScoreModel from "../../models/score.model";

const maxTime = 600;

const ScoreTeam = (props) => {

	const scores = props.scores;


	const [option, setOption] = useState('global');

	const handleOption = (e) => {
		setOption(e.target.value);
	}


	const getRoom = (roomName, scores) => {

		if (scores.length === 0) return;
		if(roomName === 'global') {
			return {
				idTeam: scores[0].idTeam,
				roomName: 'global',
				idGame: scores[0].idGame,
				time: scores.reduce((sum, score) => sum+score.time, 0),
				nbGoodAnswers: scores.reduce((sum, score) => sum+score.nbGoodAnswers, 0),
				nbBadAnswers: scores.reduce((sum, score) => sum+score.nbBadAnswers, 0),
				nbHints: scores.reduce((sum, score) => sum+score.nbHints, 0),
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

	if (scores == null || scores.length === 0) return <div>Chargement...</div>
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

			</div>
		</div>
	)
}

ScoreTeam.propTypes = {
	scores: PropTypes.array.isRequired
}

export default ScoreTeam;