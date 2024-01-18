const axios = require('axios');
const clc = require('cli-color');

const API_URL = 'http://localhost:5000/api';

class ApiService {
	static async sendRequest(method, endpoint, data) {
		const token = 'SHREKISLIFE';
		const response = await axios({
			method,
			url: API_URL + endpoint,
			data,
			headers: {
				'Authorization': `${token}`
			}
		});

		return response.data;
	}

	static async isTokenValid(token, sessionId) {
		const endpoint = `/game/gameBelongsToProf/${sessionId}`;
		const data = {
			tokenProf: token 
		};

		try {
			const response = await this.sendRequest('POST', endpoint, data);
			return response.isBelongsTo;
		} catch (error) {
			console.log(error);
			return false;
		}
	}

	static async getGameIdFromCode(code) {
		const endpoint = `/game/getIdFromCode/${code}`;
		try {
			const response = await this.sendRequest('GET', endpoint);
			console.log(response);
			return response;
		} catch (error) {
			return null;
		}
	}

	static async getStudentsFromId(id) {
		const endpoint = `/game/course/${id}`;
		try {
			const response = await this.sendRequest('GET', endpoint);
			console.log(response);
			return response;
		} catch (error) {
			return null;
		}
	}

	static async getGameStateById(id) {
		if (id == null) return null;

		const endpoint = `/game/gameState/${id}`;
		try {
			const response = await this.sendRequest('GET', endpoint);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}


	static async getRoomsFromId(id) {
		if (id == null) return null;


		// Cette route retourne []
		const endpoint = `/game/rooms/${id}`;
		try {
			const response = await this.sendRequest('GET', endpoint);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
		
	}

	static async postTeamsComposition(sessionId, teams) {
		// TODO: Envoyer la requête à l'API (lorsque route implémentée)
		return null;
	}

	static async postTeamsScore(sessionId, scores) {
		// TODO: Envoyer la requête à l'API (lorsque route implémentée)
		return null;
	}

	static async postSessionEnd(sessionId) {
		// TODO: Envoyer la requête à l'API (lorsque route implémentée)
		return null;	
	}
}

module.exports = ApiService;