import React, {useEffect, useState} from "react";
import LayoutProf from "../layouts/LayoutProf";
import 'index.css';
import Game from "../models/game.model";
import Course from "../models/course.model";
import SearchInput from "../components/SearchInput";

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
				<nav className="flex flex-row justify-end w-full">
					<SearchInput handleChangeText={handleTextChange}/>
				</nav>
				<table className="w-full min-w-[550px] primary-font-color ">
				<thead className='w-full '>
					<tr className=" w-full text-left">
						<th className="pl-5 table-title ">Nom</th>
						<th className="table-title">Date</th>
						<th className="table-title">Score</th>
						<th className="table-title">Taux de réussite</th>
						<th className="table-title">Nombre de salles</th>
						<th className="table-title text-right pr-5">Action</th>
					</tr>
				</thead>
				<tbody>
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
					</tbody>
				</table>
				{/* Pagination ou autres contrôles ici */}
			</main>
		</LayoutProf>
	);
}

export default Games;