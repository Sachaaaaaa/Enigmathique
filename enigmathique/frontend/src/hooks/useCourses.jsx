import {useState, useEffect} from 'react';
import CourseModel from 'models/course.model';

/**
 * Récupère une classe du professeur connecté
 * @param {boolean} autoload 
 * @returns 
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