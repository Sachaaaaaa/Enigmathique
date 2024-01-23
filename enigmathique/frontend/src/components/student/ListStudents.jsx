import React, {useEffect, useState} from 'react';
import Modal, {ModalBody, ModalHeader} from '../Modal';
import PropTypes from 'prop-types';
import SearchInput from "../SearchInput";
import Student from "../../models/student.model";
import StudentElement from "./StudentElement";
import ContentHeader from 'components/dashboard/ContentHeader';
import CreateButton from 'components/dashboard/CreateButton';
import Textfield from 'components/authform/Textfield';
import toast from "react-hot-toast";

const ListStudents = (props) => {
	
	const [students, setStudents] = useState([]);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	/**
	 * récupère la liste de tous les élèves de la classe
	 */
	const loadStudents = async () => {
		const data = await Student.getAll(props.id);
		setStudents(data);
		//console.log(data);
	}
	
	useEffect(() => {
		loadStudents();
	}, []);

	const handleClickCreate = async (event, firstname, lastname, idCourse) => {
		event.preventDefault();
		await toast.promise(Student.create(firstname, lastname, idCourse), {
			loading: "Ajout...",
			success: 'Elève ajouté !',
			error: "Une erreur s'est produite"
		});
		loadStudents();
		setCreateModalOpen(false);
		//console.log('create ' + id);
		setFirstname('');
		setLastname('');
	}
	
	const [filter, setFilter] = useState({text: ''});
	const handleChangeText = (e) => {
		//console.log(filter);
		setFilter({...filter, text: e.target.value})
	}
	//filtre les élèves en fonction du texte entré
	const filteredStudents = students.filter((student) =>
		student.firstname.toLowerCase().startsWith(filter.text.toLowerCase()) ||
		student.lastname.toLowerCase().startsWith(filter.text.toLowerCase())
	);
	
	const [createModalOpen, setCreateModalOpen] = useState(false);
	
	
	return (
		<>
			<ContentHeader title="Liste des élèves" link='/class'>
					<SearchInput handleChangeText={handleChangeText}/>
					<CreateButton title="Ajouter un élève" onClick={() => setCreateModalOpen(true)}/>
			</ContentHeader> 

			<ul className='flex flex-wrap gap-5 p-5 mt-10'>
				{filteredStudents.map((student) => (
					<StudentElement key={student.id} student={student} onChange={() => loadStudents()}/>
				))}
			</ul>
			{createModalOpen && (
				<Modal setOpenModal={setCreateModalOpen}>
					<ModalHeader title="Ajouter un élève"/>
					<ModalBody>

					<form className='flex flex-col justify-center items-end w-full gap-1 '>
						<Textfield
							label="Prénom de l'élève"
							placeholder="Prénom"
							name="firstname"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
						/>
						<Textfield
							label="Nom de l'élève"
							placeholder="Nom"
							name="lastname"
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
						/>
						<button
							type='submit'
							className='bg-blue-gradient-color modal-validate-button-style'
							onClick={(event) => handleClickCreate(event, firstname, lastname, props.id)}>
							Créer
						</button>
						<button
							className='modal-cancel-button-style'
							onClick={() => setCreateModalOpen(false)}>
							Annuler
						</button>
					</form>
				</ModalBody>
			</Modal>)}
		</>
	);
}

ListStudents.propTypes = {
	id: PropTypes.number.isRequired,
}

export default ListStudents;