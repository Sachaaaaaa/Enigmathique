import {useState, useEffect} from 'react';
import CourseModel from 'models/course.model';

/**
 * Récupère les classes du professeur connecté
 * @param {boolean} autoload 
 * @returns une liste des classes du professeur
 */
const useCourses = (autoload = true) => {
	const [courses, setCourses] = useState([]);

	const loadCourses = async () => {
		const data = await CourseModel.getAll();
		setCourses(data);
	};

	useEffect(() => {
		if (autoload) {
			loadCourses();
		}
	}, []);

	return [courses, loadCourses];
};

export default useCourses;