import React from "react";
import { FaGear } from "react-icons/fa6";
import {useLocation} from "react-router-dom";
const TopBar = () => {

	const location = useLocation();
	const path = location.pathname.split("/");
	path.shift();


	const prof = {
		firstname: "Philippe",
		lastname: "Lacherez",
	} // faire une requete

	const textMap ={
		dashboard: "Tableau de bord",
		class: "Mes classes",
		game: "Mes parties",
		room: "Salles d'énigmes",
	}

	let text = textMap[path[0]];

	if (path.length === 2) {
		switch (path[0]) {
			case "class":
				text = "nomclasse" //faire requete sur api;
		}
	}


	return(
		<section className="topbar-container">
			<div className="w-11/12">
				<h1 className="text-3xl">{text}</h1>
			</div>
			<div className="flex flex-row items-center gap-2">
				<div className="p-2 rounded-full bg-[#E6EFF5]">
					<FaGear/>
				</div>
				<div className="p-2 text-right">
					<p>{prof.firstname}</p>
					<p>{prof.lastname}</p>
				</div>
				<img src="https://placehold.co/40" alt="profile picture" className="rounded-full p-2"/>
			</div>
		</section>
	);
}

export default TopBar;