import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const getAll = () => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.get(API_URL + 'course', {headers: token})
		.then((response) => {
			return response.data;
		});
}
const deleteId = (id) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.delete(API_URL + 'course/' + id, {headers: token})
		.then((response) => {
			return response.data;
		});
}
const create = (name) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.post(API_URL + 'course', {name: name}, {headers: token})
		.then((response) => {
			return response.data;
		});
}
const edit = (name, id) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.put(API_URL + 'course/' + id, {name: name}, {headers: token})
		.then((response) => {
			return response.data;
		});
}

const CourseService = {
	getAll,
	deleteId,
	create,
	edit
}
export default CourseService;