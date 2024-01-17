const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

class ApiService {
	static async sendRequest(method, endpoint, data) {
		const token = process.env.TOKEN;
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
		//const ENDPOINT = `/game/gameBelongsToProf/${sessionId}?tokenId=${token}`;
		//const response = await this.sendRequest('GET', ENDPOINT);
		
		return true;
	}

	static async getGameById(id) {
		//const ENDPOINT = `/game/${id}`;
		//const response = await this.sendRequest('GET', ENDPOINT);

		return {
			idCourse: 1,
			name: 'Partie 1',
			state: 0,
			teamSize: 3,
		};
	}
}

module.exports = ApiService;