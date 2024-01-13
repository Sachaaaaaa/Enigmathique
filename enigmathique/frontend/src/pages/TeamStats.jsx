import React from 'react';
import LayoutProf from '../layouts/LayoutProf';
import {Link} from 'react-router-dom';
import GameTeam from '../components/stats/GameTeam';

const TeamStats = () => {

	const rooms = [
		{
			name: 'La menuiserie Seguin',
			time: '3:45'
		},
		{
			name: 'Le Labo',
			time: '2:50'
		}
	]

	return (
		<LayoutProf>
			<main>
				<div>
					<Link to=''>{'<'}</Link>
					<h2>Equipe de Julie Lustret et Jean-Marie Duc de Bourgogne</h2>
				</div>
				<div>
					<GameTeam rooms={rooms}/>
				</div>
			</main>
		</LayoutProf>
	)
}

export default TeamStats;