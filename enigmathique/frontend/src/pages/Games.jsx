import React, {useEffect, useState} from "react";
import LayoutProf from "../layouts/LayoutProf";
import 'index.css';
import Game from "../models/game.model";
import Course from "../models/course.model";

const Games = () => {
	const [games, setGames] = useState([]);
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
	return (
		<LayoutProf>
			<main className="p-8 h-[90%]">
				<table className="overflow-y-scroll h-full w-full block">
					<thead className="w-full">
					<tr className="sticky top-0 bg-white z-10">
						<th className="px-6 py-4 text-left">Nom</th>
						<th className="px-6 py-4 text-left">Date</th>
						<th className="px-6 py-4 text-left">Score</th>
						<th className="px-6 py-4 text-left">Taux de réussite</th>
						<th className="px-6 py-4 text-left">Nombre de salles</th>
						<th className="px-6 py-4 text-center">Action</th>
					</tr>
					</thead>
					<tbody className="w-full">
					{games.map((game, index) => {
						return (
							<tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
								<td className="px-6 py-4 whitespace-nowrap small-text">
									{game.name}
								</td>
								<td className="px-6 py-4 whitespace-nowrap small-text">{game.createdAt.toLocaleString()}</td>
								<td className="px-6 py-4 whitespace-nowrap small-text">--</td>
								<td className="px-6 py-4 whitespace-nowrap small-text">--%</td>
								<td className="px-6 py-4 whitespace-nowrap small-text">--</td>
								<td className="px-6 py-4 whitespace-nowrap small-text">
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