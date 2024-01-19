import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';
import { MdLogout } from "react-icons/md";
import {useLocation} from "react-router-dom";
import Course from "../models/course.model";
import Professor from "../models/professor.model";
import AuthService from '../services/auth.service';


const TopBarProf = () => {

	const location = useLocation();
	const path = location.pathname.split("/");
	path.shift();

	const [course, setCourse] = useState();
	const [professor, setProfessor] = useState();
	const classId = parseInt(path[1]);


	useEffect(() => {
		const load = async () => {
			setProfessor(await Professor.getCurrent());
			if (path[0] === "class" && classId) {
				setCourse(await Course.get(classId));
			}
		}
		load().then(r => console.log('Top bar data loaded'));
	}, [path[1], classId]);

	const textMap = {
		"dashboard": "Tableau de bord",
		"class": "Mes classes",
		"games": "Mes parties",
		"rooms": "Salles d'énigmes",
		"create-game": "Création de partie",
		"pregame": "",
	}

	let text = textMap[path[0]];

	if (path.length === 2) {
		switch (path[0]) {
			case "class":
				text = course ? course.name : "Chargement...";
				break;
			case "pregame":
				text = "Validation des équipes"
		}
	}

	// Déconnexion
	const handleLogout = () => {
		AuthService.logout();
	};

	return(
		<section className="topbar-container pl-5 flex justify-between h-fit">
			<div >
				<h1 className="primary-font-color text-2xl font-semibold py-5">{text}</h1>
			</div>
			<div className="flex flex-row items-center gap-2">
				<Link to='/' onClick={handleLogout} className='p-2 rounded-full bg-[#E6EFF5]'>
						<MdLogout color="#807FF7"/>
				</Link>
				<div className="primary-font-color p-5 text-right text-xs">
					<p>{professor ? professor.firstname : 'Loading...'}</p>
					<p>{professor ? professor.lastname : 'Loading...'}</p>
				</div>
			</div>
		</section>
	);
}

export default TopBarProf;