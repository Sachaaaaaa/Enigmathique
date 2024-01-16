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
			console.log(e);
		}
	}
	static async getAll() {
		try {
			const data = await GameService.getAll();
			return data.map(game => new Game(game.id, game.idCourse, game.name, game.state, game.teamSize, game.createdAt));
		}catch (e) {
			console.log(e);
		}
	}
	static async getOne(idGame) {
		try {
			const data = await GameService.getOne(idGame);
			return new Game(data.id, data.idCourse, data.name, data.state, data.teamSize, data.createdAt);
		}catch (e) {
			console.log(e);
		}
	}
	static async addRooms(idGame, rooms) {
		try {
			return await GameService.addRooms(idGame, rooms);
		}catch (e) {
			console.log(e);
		}
	}
	static async acceptTeam(idGame, idTeam) {
		try {
			return await GameService.acceptTeam(idGame, idTeam);
		}catch (e) {
			console.log(e);
		}
	}

}
export default Game;