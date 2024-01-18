import GameService from "../services/game.service";

class Game{
	constructor(id, idCourse, name, state, teamSize, createdAt) {
		this.id = id;
		this.idCourse = idCourse;
		this.name = name;
		this.state = state;
		this.teamSize = teamSize;
		this.createdAt = new Date(createdAt);
	}
	static async create(idCourse, name, teamSize) {
		try {
			const data = await GameService.createGame(idCourse, name, teamSize);
			return new Game(data.id, data.idCourse, data.name, data.state, data.teamSize, data.createdAt);
		}catch (e) {
			console.log(`erreur dans le create dans le modèle d'une game ${e}`);
		}
	}
	static async getAll() {
		try {
			const data = await GameService.getAll();
			return data.map(game => new Game(game.id, game.idCourse, game.name, game.state, game.teamSize, game.createdAt));
		}catch (e) {
			console.log(`erreur dans le getter de toutes les games dans le modèle de game (front) ${e}`);
		}
	}
	static async getOne(idGame) {
		try {
			const data = await GameService.getOne(idGame);
			return new Game(data.id, data.idCourse, data.name, data.state, data.teamSize, data.createdAt);
		}catch (e) {
			console.log(`erreur dans le getter de d'une game dans le modèle de game (front) ${e}`);
		}
	}
	static async addRooms(idGame, rooms) {
		try {
			return await GameService.addRooms(idGame, rooms);
		}catch (e) {
			console.log(`erreur dans le addRooms dans le modèle de game (front) ${e}`);
		}
	}
	static async openGame(idGame) {
		try {
			return await GameService.openGame(idGame);
		}catch (e) {
			console.log(e);
		}
	}
	static async getScores(gameCode) {
		try {
			const data = await GameService.getScores(gameCode);
			console.log('testttttttttttttttttttttttttttttt'+data);
			return await GameService.getScores(gameCode);

		}catch (e) {
			console.log(`erreur dans le getter des scores dans le modèle de game (front) ${e}`);
		}
	}

}
export default Game;