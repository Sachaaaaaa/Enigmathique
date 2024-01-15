import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const getAllRooms = () => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer un nouvel utilisateur
	return axios
		.get(API_URL + 'room', {headers: token})
		.then((response) => {
			return response.data;
		});
};


const RoomService = {
	getAllRooms
};

export default RoomService;