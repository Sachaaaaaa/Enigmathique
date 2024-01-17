import React, {useEffect, useState} from 'react';
import LayoutProf from '../layouts/LayoutProf';
import {Link, useParams} from 'react-router-dom';
import GameTeam from '../components/stats/GameTeam';
import ScoreTeam from '../components/stats/ScoreTeam';
import TeamService from "../services/team.service";

const TeamStats = () => {
	const idTeam = useParams();

	const [students, setStudents] = useState([]);
	const [scores, setScores] = useState([]);

	const loadMembers = () => {
		TeamService.getStudents(idTeam).then((response) => {
			setStudents(response);
		}).catch((error) => {
			console.log(error);
		});
	}

	useEffect(() => {
		loadMembers();
	}, []);

	const loadScores = () => {
		TeamService.getScores(idTeam).then((response) => {
			setScores(response);
		}).catch((error) => {
			console.log(error);
		});
	}

	useEffect(() => {
		loadScores();
	}, []);

	return (
		<LayoutProf>
			<main>
				<div>
					<Link to=''>{'<'}</Link>
					<h2>Equipe de {students.map((student) => student+' ')}</h2>
				</div>
				<div>
					<GameTeam scores={scores}/>
					<ScoreTeam scores={scores}/>
				</div>
			</main>
		</LayoutProf>
	)
}

export default TeamStats;