import React from 'react';
import {useState, useEffect} from 'react';
import StudentModel from 'models/student.model';

/**
 * Récupère les étudiants d'un cours
 * @param {number} idCourse 
 * @param {boolean} autoload
 * @returns une liste des étudiants d'une classe
 */
const useStudents = (idCourse, autoload = true) => {
	const [students, setStudents] = useState([]);

	const loadStudents = async () => {
		const data = await StudentModel.getAll(idCourse);
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