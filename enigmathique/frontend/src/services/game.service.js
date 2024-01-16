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
const addRooms = (idGame, roomName) => {
	const token = authHeader();
	return axios
		.post(API_URL + 'game/rooms', {
			idGame,
			roomName
		}, {headers: token})
		.then((response) => {
			return response.data;
		});
};
const openGame = (idGame) => {
	const token = authHeader();
	return axios
		.post(API_URL + 'game/open/' + idGame, {
			idGame
		}, {headers: token})
		.then((response) => {
			return response.data;
		});
};
const acceptTeam = (idTeam) => {
	const token = authHeader();
	return axios
		.post(API_URL + 'game/team/accept/' + idTeam, {
			idTeam
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


const getScores = (id) => {
	const token = authHeader();
	return axios
		.get(API_URL+'game/score/'+id, {headers: token})
		.then((response) => {
			return response.data;
		})
}


const GameService = {
	createGame,
	addRooms,
	openGame,
	acceptTeam,
	getAll,
	getScores
};

export default GameService;