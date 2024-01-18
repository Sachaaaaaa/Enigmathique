import React from 'react';
import LayoutProf from '../layouts/LayoutProf';
import {Link} from 'react-router-dom';
import GameTeam from '../components/stats/GameTeam';
import ScoreTeam from '../components/stats/ScoreTeam';

const TeamStats = () => {

	const [team, setTeam] = React.useState([]);
	const loadTeamScore = () => {
		// TODO loadTeam
	}


	const rooms = [
		{
			name: 'La menuiserie Seguin',
			time: '3:45',
			score: {
				nbHints: 5,
				nbMis: 3,
			},
		},
		{
			name: 'Le Labo',
			time: '2:50',
			score: {
				nbHints: 4,
				nbMis: 4,
			},
		},
	]

	return (
		<LayoutProf>
			<main className='overflow-y-scroll'>
				<div>
					<Link to=''>{'<'}</Link>
					<h2>Equipe de Julie Lustret et Jean-Marie Duc de Bourgogne</h2>
				</div>
				<div>
					<GameTeam rooms={rooms}/>
					<ScoreTeam rooms={rooms}/>
				</div>
			</main>
		</LayoutProf>
	)
}

export default TeamStats;