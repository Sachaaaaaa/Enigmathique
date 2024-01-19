import React from 'react';
import {useState, useEffect} from 'react';

import Course from 'models/course.model';
import TeamModel from 'models/team.model';
import Game from 'models/game.model';

/**
 * Récupère les teams d'une game données
 * @param {number} idGame
 * @param {boolean} autoload 
 * @returns 
 */
const useTeams = (idGame, autoload = true) => {
	const [teams, setCourses] = useState([]);

	const loadTeams = async () => {
		const data = await TeamModel.getTeamFromGame(idGame);
		setCourses(data);
	};

	useEffect(() => {
		if (autoload) {
			loadTeams();
		}
	}, []);

	return [teams, loadTeams];
};

export default useTeams;