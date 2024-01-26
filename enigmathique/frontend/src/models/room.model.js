import RoomService from '../services/room.service';

class RoomModel{
	/**
	 * constructeur d'une salle
	 * @param name nom de la salle
	 * @param difficulty difficulté de la salle facile, moyen, difficile
	 * @param chapter chapitre de la salle fonctions, nombres...
	 */
	constructor(name, difficulty, chapter) {
		this.name = name;
		this.difficulty = difficulty;
		this.chapter = chapter;
	}
	
	/**
	 * Getter de toutes les salles de la db
	 * @returns une map de toutes les salles
	 */
	static async getAll(){
		try {
			const data = await RoomService.getAllRooms();
			return data.map(room => new RoomModel(room.name, room.difficulty, room.chapter));
		} catch (e) {
			console.log(`erreur dans le getter de toutes les rooms du modèle de Room ${e}`);
		}
	}

}
export default RoomModel;