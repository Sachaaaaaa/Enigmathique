import React, {useEffect, useState} from "react";
import GameItem from "./GameItem";
import Game from "../../models/game.model";
import Course from "../../models/course.model";


const GamesContainer = () => {
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
		loadGames();
	},[]);
	
	// const {filter} = useCreationGameContext();
	return(
		<>
			<section className='flex flex-row items-end h-[10%] w-full blue-font-color text-xl'>
				<p className='w-[25%]'>Nom</p>
				<p className='w-[20%]'>Date</p>
				<p className='w-[20%]'>Classe</p>
				<p className='w-[15%]'>Taux de réussite</p>
				<p className='w-[15%]'>Nombre de salles</p>
				<p className='w-[15%]'>Action</p>
			</section>
			<hr></hr>
			<section className='flex flex-col h-[90%] w-full overflow-y-scroll'>
				{games.map((game, index) => {
					return(
						// game.name.toLowerCase().includes(filter.text.toLowerCase()) &&
						<>
							<GameItem
								name={game.name}
								date={game.createdAt.toLocaleString()}
								course={game.idCourse}
								winrate={game.winrate}
								numberRoom={game.numberRoom}
							/>
							{index!==games.length-1 && <hr></hr>}
						</>
					);
				})}
			</section>
		</>
	);
}

export default GamesContainer;