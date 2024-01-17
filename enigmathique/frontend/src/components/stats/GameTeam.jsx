import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const GameTeam = (props) => {

	const scores = props.scores;

	//Peut-être utile pour l'afichage
	const secondsToTime = (seconds) => {
		const minAndSec = [Math.floor(seconds/60), seconds%60];
		return minAndSec[0].toString().concat(':',minAndSec[1].toString());
	}

	const data = {
		labels: scores.map((score) => (score.roomName)),
		datasets: [
			{
			label: 'Temps par salle',
			data: scores.map((score) => (score.time))
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
					{scores.map((score, index) => (
						<li key={index}>{score.roomName}<span>{score.time}</span></li>
					))}
				</ul>
				<Doughnut data={data}/>
			</div>
		</div>
	)
}

GameTeam.propTypes = {
	scores: PropTypes.array.isRequired
}

export default GameTeam;