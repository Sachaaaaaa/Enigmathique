import React from "react";
import PopupDelete from "./PopupDelete";
import { useState } from "react";
import Modal, { ModalBody, ModalHeader } from "./Modal";

const ListStudents = () => {
	const ObjectStudents = [
		{
			firstname: "Samanta",
			secondname: "William",
			id: 1,
			class: "seconde A",
		},
		{
			firstname: "Samanta",
			secondname: "William",
			id: 1,
			class: "seconde A",
		},
		{
			firstname: "Samanta",
			secondname: "William",
			id: 1,
			class: "seconde A",
		},
	];


	// TODO: Ajouter ce qu'il faut pour appliquer les modifications à l'élève
	const [editModalOpen, setEditModalOpen] = useState(false);

	return (
		<>
			<ul className="bg-blue-300 space-y-10">
				{ObjectStudents.map((student) => (
					<li key={student.id} value={student.firstname} className="bg-blue-700 flex h-10 p-1">
						<h3 className="w-40 text-center">{student.firstname}</h3>
						<h3 className="w-40 text-center">{student.secondname}</h3>
						<h3 className="w-40 text-center">{student.class}</h3>
						<button className="bg-green-300 w-40 border-2 border-green-900">voir statistiques</button>
						<button className="bg-amber-300 w-40 border-2 border-amber-900" onClick={() => setEditModalOpen(true)}>Modifier élève</button>
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
export default ListStudents;