import {useState, useEffect} from 'react';
import Game from 'models/game.model';

/**
 * Récupère toutes les parties du professeur connecté
 * @param {boolean} autoload
 * @returns
 */
const useGames = (autoload = true) => {
	const [games, setGames] = useState([]);

	const loadGames = async () => {
		const data = await Game.getAll();
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
