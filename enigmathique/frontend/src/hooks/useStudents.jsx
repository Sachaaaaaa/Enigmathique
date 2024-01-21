import React from 'react';
import {useState, useEffect} from 'react';
import Student from 'models/student.model';

/**
 * Récupère les étudiants d'un cours
 * @param {number} idCourse 
 * @param {boolean} autoload
 */
const useStudents = (idCourse, autoload = true) => {
	const [students, setStudents] = useState([]);

	const loadStudents = async () => {
		const data = await Student.getAll(idCourse);
		setStudents(data);
	};

	useEffect(() => {
		if (autoload) {
			loadStudents();
		}
	}, []);

	return [students, loadStudents];
};

export default useStudents;