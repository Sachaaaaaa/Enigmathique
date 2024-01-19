import React, {useEffect, useState} from "react";
import LayoutProf from "../layouts/LayoutProf";
import 'index.css';
import Game from "../models/game.model";
import Course from "../models/course.model";
import SearchInput from "../components/SearchInput";
import CreateButton from "components/dashboard/CreateButton";
import ContentHeader from "components/dashboard/ContentHeader";
import TableContainer from "components/dashboard/TableContainer";
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
			<main className=" h-screen main-background-color overflow-x-hidden">
				<ContentHeader title="" link='/dashboard'>
					<SearchInput handleChangeText={handleTextChange}/>
					<Link to='/create-game'> <CreateButton title="Créer une partie" onClick={() => null}/> </Link>
				</ContentHeader>
				<TableContainer headers={['Nom', 'Date', 'Score', 'Taux de réussite', 'Nombre de salles', 'Action']}>
				{filteredGames.map((game, index) => {
						return (
							<tr key={index} className={`border-t-[1px] border-[#CECDFD] ${index % 2 === 0 ? 'bg-[#4C49ED]/[.06]' : 'bg-[#4C49ED]/[.02]'}`}>
								<td className="pl-5 td-style">
									{game.name}
								</td>
								<td className="td-style">{game.createdAt.toLocaleString()}</td>
								<td className="td-style">--</td>
								<td className="td-style">--%</td>
								<td className="td-style">--</td>
								<td className="td-style">
									<div className="flex flex-row justify-evenly">
										<button
											className={`${game.state !== 3 ? 'bg-[#e0aa00]' : 'bg-[#fcc43e]'} w-10 h-10 rounded-full`}
											disabled={game.state !== 3}
										>
										</button>
										<button
											className={`${game.state !== 3 ? 'bg-[#0704c3]' : 'bg-[#0a06f4]'} w-10 h-10 rounded-full`}
											disabled={game.state !== 3}
										>

										</button>
									</div>
								</td>
							</tr>
						);
					})}
				</TableContainer>
				{/* Pagination ou autres contrôles ici */}
			</main>
		</LayoutProf>
	);
}

export default Games;