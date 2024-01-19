import React, {useEffect, useState} from 'react';
import LayoutProf from '../layouts/LayoutProf';
import {Link, useParams} from 'react-router-dom';
import GameTeam from '../components/stats/GameTeam';
import ScoreTeam from '../components/stats/ScoreTeam';
import TeamModel from "../models/team.model";

const TeamStats = () => {
	const idTeam = useParams();

	const [students, setStudents] = useState([]);
	const [scores, setScores] = useState([]);

	const loadMembers = async () => {
		const data = await TeamModel.getStudents(idTeam);
		setStudents(data);
	}

	const loadScores = async () => {
		const data = await TeamModel.getScores(idTeam);
		setScores(data);
	}

	useEffect(() => {
		loadMembers();
		loadScores();
	}, []);

	return (
		<LayoutProf>
			<main className='overflow-y-scroll'>
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
	);
};

export default TeamStats;