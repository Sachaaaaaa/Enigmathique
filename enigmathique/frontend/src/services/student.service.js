import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_API_URL;

const get = (id) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.get(API_URL + 'course/' + id, {headers: token})
		.then((response) => {
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
const create = (firstname, secondname, idCourse) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.post(API_URL + 'course', {firstname: firstname, secondname:secondname, idCourse:idCourse }, {headers: token})
		.then((response) => {
			return response.data;
		});
}
const edit = (firstname, secondname, idCourse, id) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.put(API_URL + 'course/' + id, {firstname: firstname, secondname:secondname, idCourse:idCourse }, {headers: token})
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