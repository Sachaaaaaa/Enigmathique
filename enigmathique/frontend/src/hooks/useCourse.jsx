import React from 'react';

import {useState, useEffect} from 'react';

import Course from 'models/course.model';

/**
 * Récupère les classes du professeur connecté
 * @param {number} id
 * @param {boolean} autoload 
 * @returns 
 */
const useCourses = (id, autoload = true) => {
	const [course, setCourse] = useState(null);

	const useCourse = async (id) => {
		const data = await Course.get(id);
		setCourse(data);
	};

	useEffect(() => {
		if (autoload) {
			useCourse(id);
		}
	}, []);

	return [course, useCourse];
};

export default useCourses;