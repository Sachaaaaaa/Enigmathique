import {useState, useEffect} from 'react';
import CourseModel from 'models/course.model';

/**
 * Récupère une classe du professeur connecté
 * @param {number} id
 * @param {boolean} autoload 
 * @returns une classe du professeur
 */
const useCourse = (id, autoload = true) => {
	const [course, setCourse] = useState(null);

	const loadCourse = async (id) => {
		const data = await CourseModel.get(id);
		setCourse(data);
	};

	useEffect(() => {
		if (autoload) {
			loadCourse(id);
		}
	}, []);

	return [course, useCourse];
};

export default useCourse;