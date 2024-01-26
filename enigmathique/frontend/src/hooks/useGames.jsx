import {useState, useEffect} from 'react';
import GameModel from 'models/game.model';

/**
 * Récupère toutes les parties du professeur connecté
 * @param {boolean} autoload
 * @returns une liste des parties du professeur
 */
const useGames = (autoload = true) => {
	const [games, setGames] = useState([]);

	const loadGames = async () => {
		const data = await GameModel.getAll();
		setGames(data);
	};

	useEffect(() => {
		if (autoload) {
			loadGames().then(r => console.log('games loaded'));
		}
	}, []);

	return [games, loadGames];
};

export default useGames;
