import React, {useEffect, useState} from "react";
import PopupDelete from "./PopupDelete";
import PropTypes from "prop-types";
import StudentService from "../services/student.service";
import AuthService from "../services/auth.service";

const ListStudents = (props) => {

	const [students, setStudents] = useState([]);

	useEffect(() => {
		StudentService.get(props.id).then((response) => {
			console.log(response)
			setStudents(response);
		}).catch((error) => {
			console.log(error);
		});
	}, []);





	const MapStudents = () => {
		return students.map((student) =>
			<li key={student.id} value={student.firstname} className="bg-blue-700 flex h-10 p-1">
				<h3 className="w-40 text-center">{student.firstname}</h3>
				<h3 className="w-40 text-center">{student.lastname}</h3>
				<h3 className="w-40 text-center">{student.class}</h3>
				<PopupDelete firstname={student.firstname} secondname={student.lastname}/>
				<button className="bg-green-300 w-40 border-2 border-green-900">voir statistiques</button>
				<button className="bg-amber-300 w-40 border-2 border-amber-900">Modifier élève</button>
				<button className="bg-red-800 w-40 border-2 border-amber-900">Supprimer élève </button>
			</li>
		);
	}

	return (
		<ul className="bg-blue-300 space-y-10">
			<MapStudents/>
		</ul>
	);
}
ListStudents.propTypes = {
	id: PropTypes.number.isRequired,
}
export default ListStudents;