import {useState, useEffect} from 'react';
import RoomModel from 'models/room.model';
/**
 * Récupère toutes les salles de jeu
 * @param {boolean} autoload
 * @returns une liste des salles de jeu
 */
const useRooms = (autoload = true) => {
	const [rooms, setRooms] = useState([]);

	const loadRooms = async () => {
		const data = await RoomModel.getAll();
		setRooms(data);
	};

	useEffect(() => {
		if (autoload) {
			loadRooms();
		}
	}, []);

	return [rooms, loadRooms];
};

export default useRooms;
