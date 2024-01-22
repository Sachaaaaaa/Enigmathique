import React, {useEffect, useState} from "react";
import LayoutProf from "../layouts/LayoutProf";
import 'index.css';
import Game from "../models/game.model";
import Course from "../models/course.model";
import SearchInput from "../components/SearchInput";
import CreateButton from "components/dashboard/CreateButton";
import ContentHeader from "components/dashboard/ContentHeader";
import TableContainer from "components/dashboard/TableContainer";
import ActionButton from "components/dashboard/ActionButton";
import {Link} from "react-router-dom";

const Games = () => {
	const [games, setGames] = useState([]);
	const [filter, setFilter] = useState('');
	const [filteredGames, setFilteredGames] = useState([]);
	const loadGames = async () => {
		//récupérer toutes les games
		const data = await Game.getAll();
		//créer une promesse pour chaque game de la map data
		const updateGames = await Promise.all(
			data.map(async (game) => {
				//récupérer un objet Course à partir de l'idCourse de la game
				const course = await Course.get(game.idCourse);
				//retourner un objet game avec un idCourse qui est remplacé par le nom de la classe
				return {
					...game,
					idCourse: course.name,
				};
			})
		);
		setGames(updateGames);
	}
	useEffect(() => {
		loadGames().then(() => console.log());
	}, []);
	const handleTextChange = (e) => {
		setFilter(e.target.value);
	};
	useEffect(() => {
		const filtered = games.filter(
			(game) => game.name.toLowerCase().includes(filter.toLowerCase())
		);
		setFilteredGames([...filtered]);
	}, [filter, games]);
	return (
		<LayoutProf>
			<main>
				<ContentHeader title="" link='/dashboard'>
					<SearchInput handleChangeText={handleTextChange}/>
					<Link to='/create-game'> <CreateButton title="Créer une partie" onClick={() => null}/> </Link>
				</ContentHeader>
				<TableContainer headers={['Nom', 'Date', 'Score', 'Taux de réussite', 'Nombre de salles', 'Action']}>
					{filteredGames.map((game, index) => {
							return (
								<tr key={index} className={`border-t border-[#CECDFD] ${index % 2 === 0 ? 'bg-[#4C49ED]/[.06]' : 'bg-[#4C49ED]/[.02]'}`}>
									<td className="pl-5 td-style">
										{game.name}
									</td>
									<td className="td-style">{game.createdAt.toLocaleDateString('fr-FR')}</td>
									<td className="td-style">--</td>
									<td className="td-style">--%</td>
									<td className="td-style">--</td>
									<td className="td-style text-right pr-5">
										<div className="space-x-3">
										<ActionButton 
											title="Classement"
											link={game.state === 2 ? `/ranking/${game.id}` : ''}
										/>
										<ActionButton
											title="Détails"
											link={game.state === 2 ? `/game/${game.id}` : ''}
										/>
										</div>
									</td>
								</tr>
							);
						})}
				</TableContainer>
			</main>
		</LayoutProf>
	);
}

export default Games;