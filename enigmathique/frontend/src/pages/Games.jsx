import React, {useEffect, useState} from "react";
import LayoutProf from "../layouts/LayoutProf";
import 'index.css';
import GameModel from "../models/game.model";
import CourseModel from "../models/course.model";
import SearchInput from "../components/SearchInput";
import CreateButton from "components/dashboard/CreateButton";
import ContentHeader from "components/dashboard/ContentHeader";
import TableContainer from "components/dashboard/TableContainer";
import Notification from "components/Notification";
import GameRow from "components/dashboard/GameRow";
import EmptyPage from "components/EmptyPage";

import {Link} from "react-router-dom";

const Games = () => {
	const [games, setGames] = useState([]);
	const [filter, setFilter] = useState('');
	const [filteredGames, setFilteredGames] = useState([]);

	const loadGames = async () => {
	//récupérer toutes les games
	const data = await GameModel.getAll();
	//créer une promesse pour chaque game de la map data
	const updateGames = await Promise.all(
		data.map(async (game) => {
			//récupérer un objet Course à partir de l'idCourse de la game
			const course = await CourseModel.get(game.idCourse);
			//retourner un objet game avec un idCourse qui est remplacé par le nom de la classe
			return {
				...game,
				idCourse: course.name,
			};
		})
	);
	//mettre à jour l'état games avec la liste des games
	setGames(updateGames);
	}

	useEffect(() => {
		loadGames();
	}, []);
	const handleTextChange = (e) => {
		setFilter(e.target.value);
	};
	useEffect(() => {
		const filtered = games.filter(
			(game) => game.name.toLowerCase().includes(filter.toLowerCase())
		);
		setFilteredGames([...filtered].sort((a, b) => {
			return a.createdAt > b.createdAt ? -1 : 1
		}));
	}, [filter, games]);


	return (
		<LayoutProf title="Mes parties">
			<main >
				<Notification></Notification>
				<ContentHeader link='/dashboard'>
					<SearchInput handleChangeText={handleTextChange}/>
					<Link to='/create-game'> <CreateButton title="Créer une partie" onClick={() => null}/> </Link>
				</ContentHeader>
				
				<TableContainer headers={['Nom', 'Date', 'Classe', 'Taux de réussite', 'Action']}>
				{filteredGames.length != 0 && 
					<>
					{filteredGames.map((game, index) => {							
						return (
							<GameRow
								index={index}
								key={index}
								game={game}
								loadGames={loadGames}
							/>	
							);
						})}
					</>
				}
				</TableContainer>
				{filteredGames.length === 0 && <EmptyPage title="Vous n'avez pas encore de partie !" />}

			</main>
		</LayoutProf>
	);
}

export default Games;