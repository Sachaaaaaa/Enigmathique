import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import CourseService from "../services/course.service";
import AuthService from "../services/auth.service";
import AuthHeader from "../services/auth-header";

const ListClass = () => {

	const [courses, setCourses] = useState([]);
	useEffect(() => {
		CourseService.getAll().then((response) => {
			setCourses(response);
		}).catch((error) => {
			console.log(error);
		});
	}, []);


	return (
		<ul className="bg-blue-300 space-y-10">
			{courses.map((classe) =>{
				return(
					<li key={classe.id} value={classe.name} className="bg-blue-700 flex h-10 p-1">
						<h3 className="w-40 text-center">{classe.name}</h3>
						<Link to={`/class/${classe.id}`}>
							<button className="bg-green-300 w-40 border-2 border-green-900">Voir les élèves</button>
						</Link>
						<Link to="/*">
							<button className="bg-amber-300 w-40 border-2 border-amber-900">Modifier la classe</button>
						</Link>
						<Link to="/*">
							<button className="bg-red-800 w-40 border-2 border-amber-900">Supprimer la classe</button>
						</Link>

					</li>
				);
			})}
		</ul>
	);
};



export default ListClass;