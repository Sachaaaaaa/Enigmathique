import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

const get = (id) => {
	const token = authHeader();
	console.log('token', token);
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.post(API_URL + 'student/' + id, {idCourse: id}, {headers: token})
		.then((response) => {
			return response.data;
		});
}

const CourseService = {
	get
}
export default CourseService;