import RoomService from "../services/room.service";

class RoomModel{
	constructor(name, difficulty, chapter) {
		this.name = name;
		this.difficulty = difficulty;
		this.chapter = chapter;
	}
	static async getAll(){
		try {
			const data = await RoomService.getAllRooms();
			return data.map(room => new RoomModel(room.name, room.difficulty, room.chapter));
		} catch (e) {
			console.log(e);
		}
	}

}
export default RoomModel;