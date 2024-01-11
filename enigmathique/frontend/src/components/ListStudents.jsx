import React, {useEffect, useState} from "react";
import PopupDelete from "./PopupDelete";
import Modal, { ModalBody, ModalHeader } from "./Modal";
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






	// TODO: Ajouter ce qu'il faut pour appliquer les modifications à l'élève
	const [editModalOpen, setEditModalOpen] = useState(false);

	return (
		<>
			<ul className="bg-blue-300 space-y-10">
				{students.map((student) => (
					<li key={student.id} value={student.firstname} className="bg-gray-300 flex-col h-10 p-1">
						<h3 className="w-40 text-center">{student.firstname} {student.secondname}</h3>
						<h3 className="w-40 text-center">{student.class}</h3>
						<button className="bg-purple-800 rounded-full p-3"><ImStatsDots/></button>
						<button className="bg-purple-800 rounded-full p-3" onClick={() => setEditModalOpen(true)}><MdOutlineModeEdit/></button>
						<PopupDelete firstname={student.firstname} secondname={student.secondname} type="student"/>
					</li>
				))}
			</ul>
			{ editModalOpen && (
				<Modal setOpenModal={setEditModalOpen} >
					<ModalHeader>
						<h1 className="text-3xl text-center">Modifier un élève</h1>
					</ModalHeader>
					<ModalBody>
						<form className="flex flex-col space-y-5">
							<label htmlFor="firstname">Prénom</label>
							<input type="text" name="firstname" id="firstname" className="border-2 border-blue-900 rounded-md" />
							<label htmlFor="secondname">Nom</label>
							<input type="text" name="secondname" id="secondname" className="border-2 border-blue-900 rounded-md" />
							<label htmlFor="class">Classe</label>
							<select name="class" id="class" className="border-2 border-blue-900 rounded-md">
								<option value="seconde A">seconde A</option>
								<option value="seconde B">seconde B</option>
								<option value="seconde C">seconde C</option>
							</select>
							<button className="btn-validate">Modifier</button>
						</form>
					</ModalBody>
				</Modal> )}
		</>
	);
}
ListStudents.propTypes = {
	id: PropTypes.number.isRequired,
}
export default ListStudents;