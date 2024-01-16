import authHeader from './auth-header';
import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const getCurrentProfessor = () => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.get(API_URL + 'professor', {headers: token})
		.then((response) => {
			return response.data;
		});
}
const ProfessorService = {
	getCurrentProfessor,
}
export default ProfessorService;