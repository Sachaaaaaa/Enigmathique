import React, {useEffect, useState} from "react";
import PopupDelete from "./PopupDelete";
import PropTypes from "prop-types";
import StudentService from "../services/student.service";
import {MdOutlineModeEdit} from "react-icons/md";
import {ImStatsDots} from "react-icons/im";

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
			<li key={student.id} value={student.firstname} className="bg-gray-300 flex-col h-10 p-1 ">
				<h3 className="w-40 text-center">{student.firstname} {student.lastname}</h3>
				<h3 className="w-40 text-center">{student.class}</h3>
				<button className="bg-purple-800 rounded-full p-3"><ImStatsDots/></button>
				<button className="bg-purple-800 rounded-full p-3"><MdOutlineModeEdit/></button>
				<PopupDelete firstname={student.firstname} secondname={student.lastname} type="student"/>
			</li>
		);
	}


	return (
		<ul className="bg-blue-300 flex flex-wrap space-x-20">
			<MapStudents/>
		</ul>
	);
}
ListStudents.propTypes = {
	id: PropTypes.number.isRequired,
}
export default ListStudents;