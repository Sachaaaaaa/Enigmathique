import axios from 'axios';
import authHeader from './auth-header';

//récupération de l'url pour accéder à l'API
const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

/**
 * Permet d'obtenir la classe correspondant à l'identifiant dans la base de données
 * @param id identifiant de la classe
 */
const getOne = (id) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.get(API_URL + 'course/' + id, {headers: token})
		.then((response) => {
			return response.data;
		});
}

/**
 * Permet d'obtenir l'ensemble des classes présentes dans la base de données
 */
const getAll = () => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.get(API_URL + 'course', {headers: token})
		.then((response) => {
			return response.data;
		});
}

/**
 * Permet d'insérer une nouvelle classe dans la base de données
 * @param name nom de la classe à insérer
 */
const create = (name) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.post(API_URL + 'course', {name: name}, {headers: token})
		.then((response) => {
			return response.data;
		});
}

/**
 * Permet de mettre à jour une classe de la base de données
 * @param name nouveau nom de la classe
 * @param id identifiant de la classe à modifier
 */
const edit = (name, id) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.put(API_URL + 'course/' + id, {name: name}, {headers: token})
		.then((response) => {
			return response.data;
		});
}

/**
 * Permet de supprimer la classe correspondant à l'identifiant dans la base de données
 * @param id identifiant de la classe à supprimer
 */
const deleteId = (id) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.delete(API_URL + 'course/' + id, {headers: token})
		.then((response) => {
			return response.data;
		});
}

const CourseService = {
	getAll,
	getOne,
	deleteId,
	create,
	edit
}
export default CourseService;