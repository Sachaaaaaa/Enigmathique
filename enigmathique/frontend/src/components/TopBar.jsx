import React, {useEffect, useState} from "react";
import { FaGear } from "react-icons/fa6";
import {useLocation} from "react-router-dom";
import CourseService from "../services/course.service";


const TopBar = () => {
	
	const location = useLocation();
	const path = location.pathname.split("/");
	path.shift();
	
	const [course, setCourse] = useState(null);
	const classId = parseInt(path[1]);
	
	
	/**
	 * chargment de l'objet classe pour changer le nom en fonction de la classe
	 */
	
	//TODO à corriger
	useEffect(() => {
		const loadOneClass = () => {
			CourseService.getOne(classId)
			.then((response) => {
				setCourse(response);
			}).catch((error) => {
				console.log(error);
			});
		}
		if (path[0] === "class" && classId){
			loadOneClass();
		}
	}, [path[1], classId]);
	
	

	

	const prof = {
		firstname: "Philippe",
		lastname: "Lacherez",
	} // faire une requete

	const textMap ={
		"dashboard": "Tableau de bord",
		"class": "Mes classes",
		"game": "Mes parties",
		"room": "Salles d'énigmes",
		"create-game": "Création de partie",
	}
	
	
	
	
	let text = textMap[path[0]];
	

	if (path.length === 2) {
		switch (path[0]) {
			case "class":
				text = course ? course.name : "Chargement...";
				
				//text = "course.name";
				//text = "nomclasse" //faire requete sur api;
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