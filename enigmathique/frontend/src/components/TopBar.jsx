import React, {useEffect, useState} from "react";
import {IconContext} from 'react-icons';
import { FaGear } from "react-icons/fa6";
import {useLocation} from "react-router-dom";
import ProfessorService from "../services/professor.course";
import Course from "../models/course.model";
import Professor from "../models/professor.model";


const TopBar = () => {

	const location = useLocation();
	const path = location.pathname.split("/");
	path.shift();
	
	const [course, setCourse] = useState();
	const [professor, setProfessor] = useState('unknown')
	const classId = parseInt(path[1]);
	
	
	/**
	 * chargment de l'objet classe pour changer le nom en fonction de la classe
	 */

	useEffect(() => {
		const loadOneClass = async () => {
			const data = await Course.get(classId);
			setCourse(data);
			console.log('L id de la classe est ' + data.id);
		}
		const loadProfessore = async () => {
			const data = await Professor.getCurrent();
			setProfessor(data);
			console.log('Le nom du prof est' + data.lastname);
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
		<section className="topbar-container p-0 pl-5 flex justify-between">
			<div >
				<h1 className="text-slate-700 text-2xl font-semibold">{text}</h1>
			</div>
			<div className="flex flex-row items-center gap-2">
				<div className="p-2 rounded-full bg-[#E6EFF5]">
						<FaGear color="#807FF7"/>
				</div>
				<div className="px-0 py-2 text-right text-xs">
					<p>{professor.firstname}</p>
					<p>{professor.lastname}</p>
				</div>
				<img src="https://placehold.co/40" alt="profile picture" className="rounded-[100px] pl-1 pr-2 pt-2 pb-2"/>
			</div>
		</section>
	);
}

export default TopBar;