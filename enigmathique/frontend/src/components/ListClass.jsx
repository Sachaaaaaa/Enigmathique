import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import CourseService from "../services/course.service";
import PopupDelete from './PopupDelete';
import Modal, {ModalBody, ModalHeader} from "./Modal";
import {MdOutlineModeEdit} from "react-icons/md";
import { CiSquareMore } from "react-icons/ci";

const ListClass = () => {

	const [courses, setCourses] = useState([]);
	useEffect(() => {
		CourseService.getAll().then((response) => {
			setCourses(response);
		}).catch((error) => {
			console.log(error);
		});
	}, []);

	const [editModalOpen, setEditModalOpen] = useState(false);

	return (
		<>
			<ul className="bg-blue-300 space-y-10">
				{courses.map((classe) => (
					<li key={classe.id} value={classe.name} className="bg-blue-700 flex h-10 p-1">
						<h3 className="w-40 text-center">{classe.name}</h3>
						<Link to={`/class/${classe.id}`}>
							<button className="btn-utils-student"><MdOutlineModeEdit/></button>
						</Link>
						<Link to="/*">
							<button className="btn-utils-student"><CiSquareMore/></button>
						</Link>
						<PopupDelete name={classe.name} type="class"/>
					</li>
				))}
			</ul>
			{editModalOpen && (
				<Modal setOpenModal={setEditModalOpen}>
					<ModalHeader>
						<h1 className="text-3xl text-center">Modifier la classe</h1>
					</ModalHeader>
					<ModalBody>
						<form className="flex flex-col space-y-5">
							<label htmlFor="name">Nom de la classe</label>
							<input type="text" name="name" id="name" className="border-2 border-blue-900 rounded-md"/>
							<button className="btn-delete">Annuler</button>
							<button className="btn-validate">Valider la modification</button>
						</form>
					</ModalBody>
				</Modal>)}
		</>
	);
};

export default ListClass;
