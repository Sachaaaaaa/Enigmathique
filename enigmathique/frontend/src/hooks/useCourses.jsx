import React from 'react';
import {useState, useEffect} from 'react';

import Course from 'models/course.model';

/**
 * Récupère les classes du professeur connecté
 * @param {boolean} autoload 
 * @returns 
 */
const useCourses = (autoload = true) => {
	const [courses, setCourses] = useState([]);

	const loadClasses = async () => {
		const data = await Course.getAll();
		setCourses(data);
	};

	useEffect(() => {
		if (autoload) {
			loadClasses();
		}
	}, []);

	return [courses, loadClasses];
};

export default useCourses;