import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const register = (firstname, lastname, mail, password) => {
	// Envoie une requête au serveur pour créer un nouvel utilisateur
	return axios
		.post(API_URL + '/auth/register', {
			firstname,
			lastname,
			mail,
			password
		})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			return response.data;
		});
};

const login = (mail, password) => {
	// Envoie une requête au serveur pour authentifier un utilisateur
	return axios
		.post(API_URL + '/auth/login', {
			mail,
			password
		})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			return response.data;
		});
};

const logout = () => {
	// Supprime l'utilisateur de la mémoire locale
	localStorage.removeItem('user');
};

const getCurrentUser = () => {
	// Retourne l'utilisateur courant
	return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser
};

export default AuthService;