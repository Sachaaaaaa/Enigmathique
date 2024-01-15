import React from "react";
import LayoutProf from "../layouts/LayoutProf";
import GamesContainer from "../components/games/GamesContainer";
import GameNav from "../components/games/GameNav";

const Games = () => {
	return(
		<LayoutProf>
			<main className="h-5/6 w-full bg-[#f5f7fa] p-4">
				<section className='flex flex-col h-[96%] w-full gap-4'>
					<section className='h-[10%] flex flex-row justify-evenly items-center '>
						<GameNav/>
					</section>
					<section className="h-[90%]">
						<GamesContainer/>
					</section>
				</section>
			</main>
		</LayoutProf>
	);
}

export default Games;