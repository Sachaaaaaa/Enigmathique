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
			console.log(error);
			return null;
		}
	}

	static async getTeamsFromCode(code) {
		const endpoint = `/game/getTeams/${code}`;
	}

	static async getGameStateById(id) {
		if (id == null) return null;

		const endpoint = `/game/gameState/${id}`;
		console.log(endpoint);
		try {
			const response = await this.sendRequest('GET', endpoint);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

module.exports = ApiService;