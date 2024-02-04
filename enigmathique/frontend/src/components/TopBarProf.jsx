import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import {useLocation} from 'react-router-dom';
import CourseModel from 'models/course.model';
import ProfessorModel from 'models/professor.model';
import AuthService from 'services/auth.service';
import PropTypes from 'prop-types';

/**
 * Entête des pages du côté prof
 * @param title titre de la page
 * @param id
 * @returns {Element}
 * @constructor
 */
const TopBarProf = ({title, id}) => {
	const location = useLocation();
	const path = location.pathname.split("/");
	path.shift();

	const [course, setCourse] = useState();
	const [professor, setProfessor] = useState();
	const classId = parseInt(path[1]);


	useEffect(() => {
		const load = async () => {
			setProfessor(await ProfessorModel.getCurrent());
			if (path[0] === "class" && classId) {
				setCourse(await CourseModel.get(classId));
			}

		}
		load().then(r => console.log('Top bar data loaded'));
	}, [classId]);

	if (path.length === 2) {
		switch (path[0]) {
			case "class":
				title = course ? course.name : "Chargement...";
		}
	}

	// Déconnexion
	const handleLogout = () => {
		AuthService.logout();
	};

	const [displayMenu, setDisplayMenu] = useState("flex");
	const handleMenu = () => {
		document.getElementById('sidebar').style.display = displayMenu;
		setDisplayMenu(displayMenu === "none" ? "flex" : "none");
	}

	return(
		<section className="topbar-container p-5 flex justify-between h-fit">

			<div className='flex items-center gap-3'>
				<input id="toggle" type="checkbox" onClick={handleMenu}></input>
				<label htmlFor="toggle" id="hamburger">
					<div id="top-bun"></div>
					<div id="meat"></div>
					<div id="bottom-bun"></div>
				</label>
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