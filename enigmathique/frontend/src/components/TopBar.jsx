import React, {useEffect, useState} from "react";
import { FaGear } from "react-icons/fa6";
import {useLocation} from "react-router-dom";
import ProfessorService from "../services/professor.course";
import Course from "../models/course.model";


const TopBar = () => {

	const location = useLocation();
	const path = location.pathname.split("/");
	path.shift();
	
	const [course, setCourse] = useState();
	const [professor, setProfessor] = useState('unknown')
	const classId = parseInt(path[1]);

	console.log(Course.get(33));
	
	
	/**
	 * chargment de l'objet classe pour changer le nom en fonction de la classe
	 */

	useEffect(() => {
		const loadOneClass = async () => {
			const data = await Course.get(classId);
			setCourse(data);
			console.log(data);
		}
		const loadProfessore = () => {
			ProfessorService.getCurrentProfessor()
				.then((response) => {
					setProfessor(response);
				}).catch((error) => {
					console.log(error);
			});
		}

		loadProfessore();

		if (path[0] === "class" && classId){
			loadOneClass();
		}
	}, [path[1], classId]);
	


	const textMap ={
		"dashboard": "Tableau de bord",
		"class": "Mes classes",
		"games": "Mes parties",
		"room": "Salles d'énigmes",
		"create-game": "Création de partie",
		"pregame":"",
	}

	let text = textMap[path[0]];

	if (path.length === 2) {
		switch (path[0]) {
			case "class":
				text = course ? course.name : "Chargement...";
				//faire requete sur api;
				break;
			case "pregame":
				text="Validation des équipes"
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
					<p>{professor.firstname}</p>
					<p>{professor.lastname}</p>
				</div>
				<img src="https://placehold.co/40" alt="profile picture" className="rounded-full p-2"/>
			</div>
		</section>
	);
}

export default TopBar;