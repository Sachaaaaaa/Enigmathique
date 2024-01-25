import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import {useLocation} from "react-router-dom";
import CourseModel from "../models/course.model";
import ProfessorModel from "../models/professor.model";
import AuthService from '../services/auth.service';
import PropTypes from 'prop-types';
import GameModel from "models/game.model";
import StudentModel from "models/student.model";


const TopBarProf = ({title, id}) => {

	const location = useLocation();
	const path = location.pathname.split("/");
	path.shift();

	const [course, setCourse] = useState();
	const [game, setGame] = useState();
	const [student, setStudent] = useState();
	const [professor, setProfessor] = useState();
	const classId = parseInt(path[1]);


	useEffect(() => {
		const load = async () => {
			setProfessor(await ProfessorModel.getCurrent());
			if (title === "class") {
				setCourse(await CourseModel.get(id));
			} else if (title === "game") {
				setGame(await GameModel.getOne(id));
			} else if (title === "student") {
				setStudent(await StudentModel.getOne(id));
			}

		}
		load().then(r => console.log('Top bar data loaded'));
	}, [id]);

	
	switch (title) {
		case "game":
			title = game ? game.name : "Chargement...";
			break;
		case "class":
			title = course ? course.name : "Chargement...";
			break;
		case "student":
			title = student ? student.firstname + " " + student.lastname : "Chargement...";
			break;
		default:
			break;
	}

	// Déconnexion
	const handleLogout = () => {
		AuthService.logout();
	};

	return(
		<section className="topbar-container p-5 flex justify-between h-fit">

			<div >
				<h1 className="primary-font-color text-2xl font-semibold ">{title}</h1>
			</div>
			
			<div className="flex flex-row items-center gap-5">

				{/* Logo déconnexion */}
				<Link to='/' onClick={handleLogout} className='p-2 rounded-full bg-[#E6EFF5]'>
						<MdLogout color="#4C49ED"/>
				</Link>
				
				{/* Nom du professeur */}
				<div className="primary-font-color text-right text-xs">
					<p>{professor ? professor.firstname : 'Chargement...'}</p>
					<p>{professor ? professor.lastname : 'Chargement...'}</p>
				</div>
			</div>
		</section>
	);
}

TopBarProf.propTypes = {
	title: PropTypes.string,
	id: PropTypes.number,
};

export default TopBarProf;