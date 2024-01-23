const axios = require('axios');
const clc = require('cli-color');

const API_URL = 'http://localhost:5000/api';

class ApiService {
	static async sendRequest(method, endpoint, data) {
		const token = process.env.API_TOKEN;
		const response = await axios({
			method,
			url: API_URL + endpoint,
			data: data,
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
			console.log(error);
			return null;
		}
	}

	static async getStudentsFromGameId(id) {
		const endpoint = `/game/course/${id}`;
		try {
			const response = await this.sendRequest('GET', endpoint);
			// Retourne un tableau d'objets { id, firstname, lastname } => retire les autres informations non nécessaires
			return response.map(student => { return { id: student.id, firstname: student.firstname, lastname: student.lastname } });
		} catch (error) {
			console.log(error);
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

	static async getMaxTeamSizeFromId(id) {
		if (id == null) return null;

		const endpoint = `/game/maxTeamSize/${id}`;
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

	static async getTeamsFromId(id) {
		if (id == null) return null;

		const endpoint = `/game/teams/${id}`;
		try {
			const response = await this.sendRequest('GET', endpoint);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}	
	}

	static async postTeamsComposition(sessionId, teams) {
		const endpoint = '/team/student';
		const data = {
			teams,
			idGame: sessionId
		};

		try {
			const response = await this.sendRequest('POST', endpoint, data);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async postTeamsScore(sessionData) {
		const endpoint = '/team/score';

		try {
			const response = await this.sendRequest('POST', endpoint, sessionData);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async postSessionEnd(sessionId, endedNormally) {
		const endpoint = '/game/end/' + sessionId;
		const data = {
			endedNormally
		};

		try {
			const response = await this.sendRequest('POST', endpoint, data);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async putGameState(gameId, state) {
		const endpoint = '/game/state/' + gameId;
		const data = {
			state: state
		};

		try {
			const response = await this.sendRequest('PUT', endpoint, data);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	static async deleteGame(id) {
		const endpoint = '/game/' + id;

		try {
			const response = await this.sendRequest('DELETE', endpoint);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}

module.exports = ApiService;