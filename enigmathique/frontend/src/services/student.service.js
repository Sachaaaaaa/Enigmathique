import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;


const get = (id) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.get(API_URL + 'course/students/' + id, {headers: token})
		.then((response) => {
			console.log(response.data);
			return response.data;
		});
}

const deleteId = (id) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.delete(API_URL + 'student/' + id, {headers: token})
		.then((response) => {
			return response.data;
		});
}
const create = (firstname, lastname, idCourse) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.post(API_URL + 'student', {firstname: firstname, lastname:lastname, idCourse:idCourse }, {headers: token})
		.then((response) => {
			return response.data;
		});
}
const edit = (firstname, lastname, idCourse, idStudent) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.put(API_URL + 'course/' + idCourse, {firstname: firstname, lastname:lastname, idStudent: idStudent }, {headers: token})
		.then((response) => {
			return response.data;
		});
}
const StudentService = {
	get,
	create,
	deleteId,
	edit,
}
export default StudentService;