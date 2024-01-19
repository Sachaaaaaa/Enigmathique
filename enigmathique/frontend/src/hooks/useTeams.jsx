import React from 'react';
import {useState, useEffect} from 'react';

import Course from 'models/course.model';

/**
 * Récupère les teams du professeur connecté
 * @param {boolean} autoload 
 * @returns 
 */
const useTeams = (autoload = true) => {
	const [teams, setCourses] = useState([]);

	const loadTeams = async () => {
		const data = await Course.getAll();
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