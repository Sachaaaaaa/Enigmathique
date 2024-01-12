const socketio = require('socket.io');
const clc = require('cli-color');
const { ServerToClient, ClientToServer } = require('./socketMessages');
const SocketTeam = require('./team');

class Session {
	constructor(game, sessionId, expectedTeamCount) {
		this.game = game;
		this.sessionId = sessionId;
		this.teams = [];
		this.started = false;
		this.expectedTeamCount = 0;
	}

	getTotalTeamCount = () => {
		return this.teams.length;
	}

	areAllTeamsReady = () => {
		return this.getTotalTeamCount() > 0 && this.teams.every(team => team.isReady);
	}

	addTeam = (team) => {
		this.teams.push(team);
	}

	removeTeam = (team) => {
		const index = this.teams.indexOf(team);
		if (index >= 0) {
			this.teams.splice(index, 1);
		}
	}



	tick = () => {
		//console.log(clc.cyan(`[Session ${this.sessionId}] Tick...`));
	}

	onTeamReady = (team) => {

	}
}

module.exports = Session;