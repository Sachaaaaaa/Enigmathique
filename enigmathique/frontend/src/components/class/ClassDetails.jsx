import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import GameModel from 'models/game.model';
import CourseModel from 'models/course.model';
import {useNavigate} from 'react-router-dom';
import ContentHeader from 'components/dashboard/ContentHeader';
import TableContainer from 'components/dashboard/TableContainer';
import {getRowColor} from 'components/ListManager';
import ActionButton from 'components/dashboard/ActionButton';

/**
 * Composant de détails d'une classe
 * @param idClass
 * @returns {Element}
 * @constructor
 */
const ClassDetails = ({idClass}) => {
	
	const [selectedGame, setSelectedGame] = useState([]);
	const [games, setGames] = useState([]);
	const [currentClass, setCurrentClass] = useState(null);
	const [listGame, setListGame] = useState([]);
	const navigate = useNavigate();
	/**
	 * Récupération de la classe courante
	 * @returns {Promise<CourseModel>}
	 */
	const loadCurrentClass = async () =>{
		const data = await CourseModel.get(idClass);
		setCurrentClass(data);
		if (data === undefined) {
			navigate('/class');
		}
		return data;
	};
	
	/**
	 * chargement de toutes les games
	 * @returns {Promise<void>}
	 */
	const loadAllGames = async () =>{
		const data = await GameModel.getAll();
		setGames(data);
		const classe = await loadCurrentClass();
		addGame(data, classe);
	};
	useEffect(() => {
		loadAllGames();
	}, []);
	/**
	 * Sélection des games de la classe courante
	 * @param games
	 * @param classe
	 * @returns {*[]}
	 */
	const addGame = (games, classe) => {
		if (classe === undefined) {
			return [];
		}
		let tempListGames = [];
		games.map((game) => {
			if (game.idCourse === classe.id && !selectedGame.some((selectedGame) => selectedGame.id === game.id)) {
				tempListGames.push(game);
			}
		});
		setSelectedGame(tempListGames);
		
	};
	/**
	 * Récupération du taux de réussite d'une partie
	 * @param game
	 * @returns {Promise<number>}
	 */
	const getWinRate = async (game) => {
		const scores = await GameModel.getScores(game.id);
		if (scores == null) return 0;
		let winRate = 0;
		const nbScore = scores.length;
		if(scores.length !== 0) {
			scores.forEach((score) => {
				score.isSolved && winRate++;
			});
			return Math.floor((winRate / nbScore) * 100);
		} else {
			return 0;
		}
	};
	
	/**
	 * Récupération du taux de réussite d'une partie
	 * @returns {Promise<void>}
	 */
	const getListGame = async () => {
		//attendre que toutes les promesses soient chargées pour effectuer la suite
		const newGame = await Promise.all(
			selectedGame.map(async (game) => {
				const winrate = await getWinRate(game);
				return {
					id: game.id,
					name: game.name,
					date: game.createdAt.toLocaleDateString('fr-Fr'),
					winrate: winrate,
				};
				
			})
		);
		//s'assurer que la liste des games ne contient pas de doublons
		setListGame((prevListGame) => {
			const uniqueNewGame = newGame.filter(
				(newGame) => !prevListGame.some((existingGame) => existingGame.id === newGame.id)
			);
			// Trier la liste combinée par dates la plus récentes
			const sortedList = [...prevListGame, ...uniqueNewGame].sort((a, b) => {
				return b.date.localeCompare(a.date);
			});
			return sortedList;
		});
	};
	useEffect(() => {
		if (selectedGame.length > 0) {
			getListGame();
		}
	}, [selectedGame]);
	
	return(
		<>
			<main>
				<ContentHeader
					title={currentClass ? currentClass.name : 'Loading...'}
					link='/class'
				/>
				<div className="overflow-x-auto mt-4">
					<TableContainer headers={['Nom de la partie','Date', 'Taux de réussite', 'Action']}>
						{listGame.map((game, index) => (
							<tr key={game.id} className={getRowColor(index)}>
								<td className="td-style">
									{game.name}
								</td>
								<td className="td-style">
									{game.date}
								</td>
								<td className="td-style">
									{game.winrate}%
								</td>
								<td className="td-style text-right">
									<ActionButton
										link={`/ranking/${game.id}`}
										title='Classement'
									>
									</ActionButton>
								</td>
							</tr>
						))}
					</TableContainer>
				</div>
			</main>
		</>
	);
};
ClassDetails.propTypes = {
	idClass: PropTypes.number.isRequired
};
export default ClassDetails;