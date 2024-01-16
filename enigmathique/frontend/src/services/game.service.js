import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const getAll = () => {
	const token = authHeader();
	return axios
		.get(API_URL+'game', {headers: token})
		.then((response) => {
			return response.data;
		});
}
const getOne = (id) => {
	const token = authHeader();
	return axios
		.get(API_URL+'game/'+id, {headers: token})
		.then((response) => {
			return response.data;
		});
}
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
const getScores = (idGame) => {
	const token = authHeader();
	return axios
		.get(API_URL+'game/score/'+idGame, {headers: token})
		.then((response) => {
			return response.data;
		})
}

//socket
const acceptTeam = (idGame, idTeam) => {
	const token = authHeader();
	return axios
		.post(API_URL + 'game/team/accept/' + idTeam, {
			idGame
		}, {headers: token})
		.then((response) => {
			return response.data;
		});
};
//socket
const getGameBelongsToProfessor = (idProfessor) => {
	const token = authHeader();
	return axios
		.get(API_URL + 'game/gameBelongsToProf/' + idProfessor, {headers: token})
		.then((response) => {
			return response.data;
		});
};
//socket
const EndGame = (idGame) => {
	const token = authHeader();
	return axios
		.post(API_URL + 'game/end/' + idGame, {}, {headers: token})
		.then((response) => {
			return response.data;
		});
};
//socket
const openGame = (idGame) => {
	const token = authHeader();
	return axios
		.post(API_URL + 'game/open/' + idGame, {}, {headers: token})
		.then((response) => {
			return response.data;
		});
};
//socket
const closeGame = (idGame) => {
	const token = authHeader();
	return axios
		.post(API_URL + 'game/close/' + idGame,  {}, {headers: token})
		.then((response) => {
			return response.data;
		});
};
//socket
const getCourseFromGameCode = (gameCode) => {
	const token = authHeader();
	return axios
		.get(API_URL + 'game/course/' + gameCode, {headers: token})
		.then((response) => {
			return response.data;
		});
};




/**
 * Permet d'avoir tous les scores liés à une partie
 * @param id id de la partie dont on veut les scores
 * @returns {Promise<axios.AxiosResponse<any>>}
 */



const GameService = {
	createGame,
	addRooms,
	getAll,
	getOne,
	getScores
};

export default GameService;