import axios from "axios"

const API_URL = "http://localhost:5000/api";

const register = (firstname, lastname, mail, password) => {
	// Envoie une requête au serveur pour créer un nouvel utilisateur
	return axios.post(API_URL + "/auth/register", {
		firstname,
		lastname,
		mail,
		password
	});
}

const login = (mail, password) => {
	// Envoie une requête au serveur pour authentifier un utilisateur
	return axios
		.post(API_URL + "/auth/login", {
			mail,
			password
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		});
}

const logout = () => {
	// Supprime l'utilisateur de la mémoire locale
	localStorage.removeItem("user");
}

const getCurrentUser = () => {
	// Retourne l'utilisateur courant
	return JSON.parse(localStorage.getItem("user"));
}

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser
};

export default AuthService;