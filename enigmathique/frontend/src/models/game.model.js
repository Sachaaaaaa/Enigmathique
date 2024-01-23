import GameService from "../services/game.service";
import ScoreModel from "./score.model";

class GameModel {
	/**
	 * Constructeur d'une partie
	 * @param id identifiant de la partie
	 * @param idCourse identifiant de la classe associée
	 * @param name nom de la partie
	 * @param state état de progression de la partie: 0 si non commencée, 1 si non finie, 2 si finie
	 * @param teamSize taille maximum des équipes lors de la partie
	 * @param createdAt date de création de la partie
	 * @param gameCode code de connexion à la partie. N'est présent que en state 0 ou 1
	 */
	constructor(id, idCourse, name, state, teamSize, createdAt, gameCode) {
		this.id = id;
		this.idCourse = idCourse;
		this.name = name;
		this.state = state;
		this.teamSize = teamSize;
		this.createdAt = new Date(createdAt);
		this.gameCode = gameCode;
	}
	/**
	 * Getter d'une partie à partir de son identifiant
	 * @param idGame identifiant de la partie
	 * @returns la partie correspondant à l'id
	 */
	static async getOne(idGame) {
		try {
			const data = await GameService.getOne(idGame);
			return new GameModel(data.id, data.idCourse, data.name, data.state, data.teamSize, data.createdAt, data.gameCode);
		}catch (e) {
			console.log(`erreur dans le getter de d'une game dans le modèle de game (front) ${e}`);
		}
	}


	/**
	 * Getter de toutes les parties du professeur
	 * @returns liste de toutes les parties
	 */
	static async getAll() {
		try {
			//appel au service pour récupérer les données
			const data = await GameService.getAll();
			//transformation de ces données en un nouvel objet d etype GameModel
			return data.map(game => new GameModel(game.id, game.idCourse, game.name, game.state, game.teamSize, game.createdAt, game.gameCode));
		}catch (e) {
			console.log(`erreur dans le getter de toutes les games dans le modèle de game (front) ${e}`);
		}
	}
	/**
	 * Getter des scores associés à la partie identifiée
	 * @param idGame identifiant de la partie dont on veut les scores
	 * @returns liste des scores associés à la partie
	 */
	static async getScores(idGame) {
		try {
			//appel au service pour obtenir les données
			const data = await GameService.getScores(idGame);
			//transformation de ces données en une liste d'objet ScoreModel
			return data.map((score) => new ScoreModel(score.idTeam, score.roomName, score.idGame, score.time, score.isSolved,
				score.nbGoodAnswers, score.nbBadAnswers, score.nbHints, score.createdAt, score.updatedAt));
		}catch (e) {
			console.log(`erreur dans le getter des scores dans le modèle de game (front) ${e}`);
		}
	}

	/**
	 * Permet de créer une partie à partir de l'identifiant de la classe associée, de son nom et de la taille des équipes
	 * @param idCourse identifiant de la classe qui va participer à la partie
	 * @param name nom de la partie
	 * @param teamSize taille des équipes lors de la partie
	 * @returns la nouvelle partie créée
	 */
	static async create(idCourse, name, teamSize) {
		try {
			//appel au service pour insérer les données et les obtenir
			const data = await GameService.createGame(idCourse, name, teamSize);
			//création d'un nouvel objet GameModel à partir de ces données
			return new GameModel(data.id, data.idCourse, data.name, data.state, data.teamSize, data.createdAt, data.gameCode);
		}catch (e) {
			console.log(`erreur dans le create dans le modèle d'une game ${e}`);
		}
	}



	/**
	 * Permet d'ajouter des salles à la partie identifiée
	 * @param idGame identifiant de la partie dont on veut associer des salles
	 * @param rooms liste des salles à attribuer à la partie
	 */
	static async addRooms(idGame, rooms) {
		try {
			//appel au service pour ajouter les salles à la partie
			return await GameService.addRooms(idGame, rooms);
		}catch (e) {
			console.log(`erreur dans le addRooms dans le modèle de game (front) ${e}`);
		}
	}

	/**
	 * Permet d'ouvrir la partie identifiée aux connexions
	 * @param idGame identifiant de la partie à ouvrir
	 */
	static async openGame(idGame) {
		try {
			//appel au service pour ouvrir la partie
			return await GameService.openGame(idGame);
		}catch (e) {
			console.log(e);
		}
	}

	/**
	 * Permet de supprimer la partie identifiée
	 * @param idGame identifiant de la partie
	 */
	static async delete(idGame) {
		try {
			//appel au service pour supprimer la partie
			return await GameService.deleteGame(idGame);
		}catch (e) {
			console.log(`erreur dans le delete dans le modèle de game (front) ${e}`);
		}
	}

}
export default GameModel;