import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const createGame = (idCourse, name, teamSize) => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer un nouvel utilisateur
	return axios
		.post(API_URL + 'game', {
			idCourse,
			name,
			teamSize
		}, {headers: token})
		.then((response) => {
			return response.data;
		});
};

const getAll = () => {
	const token = authHeader();
	return axios
		.get(API_URL+'game', {headers: token})
		.then((response) => {
			return response.data;
		});
}


const GameService = {
	createGame,
	getAll
};

export default GameService;