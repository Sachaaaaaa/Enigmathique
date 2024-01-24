import axios from 'axios';
import authHeader from "./auth-header";

const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const register = (firstname, lastname, mail, password) => {
	// Envoie une requête au serveur pour créer un nouvel utilisateur
	return axios
		.post(API_URL + 'auth/register', {
			firstname,
			lastname,
			mail,
			password
		})
		.then((response) => {
			if (response.data.token) {
				sessionStorage.setItem('user', JSON.stringify(response.data));
			}
			return response.data;
		});
};

const login = (mail, password) => {
	// Envoie une requête au serveur pour authentifier un utilisateur
	return axios
		.post(API_URL + 'auth/login', {
			mail,
			password
		})
		.then((response) => {
			if (response.data.token) {
				sessionStorage.setItem('user', JSON.stringify(response.data));
			}
			return response.data;
		});
};

const logout = 	async() => {
	const token = authHeader();
	await axios
		.post(API_URL + 'auth/logout', {}, {headers: token});
	// Supprime l'utilisateur de la mémoire locale
	sessionStorage.removeItem('user');
};

const getCurrentUser = () => {
	// Retourne l'utilisateur courant
	return JSON.parse(sessionStorage.getItem('user'));
};

const getToken = () => {
	// Retourne le token de l'utilisateur courant
	const user = JSON.parse(sessionStorage.getItem('user'));
	return user.token;
};

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser,
	getToken
};

export default AuthService;