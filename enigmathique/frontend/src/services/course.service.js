import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getAll = () => {
	const token = authHeader();
	// Envoie une requête au serveur pour créer une nouvelle classe
	return axios
		.get(API_URL + "course", { headers: token })
		.then((response) => {
			return response.data;
		});
}

const CourseService = {
	getAll
}
export default CourseService;