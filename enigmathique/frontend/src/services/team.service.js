import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

const getStudents = (idTeam) => {
	const token = authHeader();
	return axios
		.get(API_URL + '/team/students' + idTeam, {headers: token})
		.then((response) => {
			return response.data;
		});
}

const getScores = (idTeam) => {
	const token = authHeader();
	return axios
		.get(API_URL + '/team/score' + idTeam, {headers: token})
		.then((response) => {
			return response.data;
		});
}
const getTeam = (idTeam) => {
	const token = authHeader();
	return axios
		.get(API_URL + '/team/' + idTeam, {headers: token})
		.then((response) => {
			return response.data;
		});
}

const TeamService = {
	getStudents,
	getScores,
	getTeam
}

export default TeamService