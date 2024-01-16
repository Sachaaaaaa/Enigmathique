import React, {useEffect, useState} from "react";
import GameItem from "./GameItem";
import Game from "../../models/game.model";



const GamesContainer = () => {
	const [games, setGames] = useState([]);
	const loadGames = async () => {
		const data = await Game.getAll();
		setGames(data);
	}
	useEffect(() => {
		loadGames();
	}, []);
	// const {filter} = useCreationGameContext();
	return(
		<>
			<section className='flex flex-row items-end h-[10%] w-full text-[#0A06F4] text-xl'>
				<p className='w-[25%]'>Nom</p>
				<p className='w-[15%]'>Date</p>
				<p className='w-[25%]'>Classe</p>
				<p className='w-[20%]'>Taux de réussite</p>
				<p className='w-[10%]'>Nombre de salles</p>
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
								date={game.createdAt}
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