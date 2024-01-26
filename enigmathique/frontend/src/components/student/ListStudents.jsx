import React, {useEffect, useState} from 'react';
import Modal, {ModalBody, ModalHeader} from '../Modal';
import PropTypes from 'prop-types';
import SearchInput from "../SearchInput";
import StudentModel from "../../models/student.model";
import StudentElement from "./StudentElement";
import ContentHeader from 'components/dashboard/ContentHeader';
import CreateButton from 'components/dashboard/CreateButton';
import Textfield from 'components/authform/Textfield';
import toast from "react-hot-toast";
import EmptyPage from 'components/EmptyPage';

const ListStudents = (props) => {
	
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	/**
	 * récupère la liste de tous les élèves de la classe
	 */


	const handleClickCreate = async (event, firstname, lastname, idCourse) => {
		event.preventDefault();
		await toast.promise(StudentModel.create(firstname, lastname, idCourse), {
			loading: "Ajout...",
			success: 'Elève ajouté !',
			error: "Une erreur s'est produite"
		});
		setCreateModalOpen(false);
		props.loadStudents();
		setFirstname('');
		setLastname('');
	}
	
	const [filter, setFilter] = useState({text: ''});
	const handleChangeText = (e) => {
		setFilter({...filter, text: e.target.value})
	}

	const compareStudents = (stud1, stud2) => {
		if(stud1.lastname.toLowerCase() < stud2.lastname.toLowerCase() ||
			(stud1.lastname.toLowerCase() === stud2.lastname.toLowerCase() && stud1.firstname.toLowerCase() < stud2.firstname.toLowerCase())) {
			return -1;
		} else if (stud1.lastname.toLowerCase() > stud2.lastname.toLowerCase() ||
			(stud1.lastname.toLowerCase() === stud2.lastname.toLowerCase() && stud1.firstname.toLowerCase() > stud2.firstname.toLowerCase())){
			return 1;
		} else {
			return 0;
		}
	}

	//const filteredStudents = props.students.sort( (studA, studB) =>{return compareStudents(studA, studB);});

	const filteredStudents = props.students.filter((student) =>
		student.firstname.toLowerCase().startsWith(filter.text.toLowerCase()) ||
		student.lastname.toLowerCase().startsWith(filter.text.toLowerCase())
	).sort( (studA, studB) =>{return compareStudents(studA, studB);});
	//filtre les élèves en fonction du texte entré

	
	const [createModalOpen, setCreateModalOpen] = useState(false);
	
	
	return (
		<>
			<ContentHeader title="Liste des élèves" link='/class'>
				<SearchInput handleChangeText={handleChangeText}/>
				<CreateButton title="Ajouter un élève" onClick={() => setCreateModalOpen(true)}/>
			</ContentHeader> 
			{filteredStudents.length != 0 && 
			<ul className='flex flex-wrap gap-5 p-5 mt-10'>
				{filteredStudents.map((student) => (
					<StudentElement key={student.id} student={student} onChange={() => props.loadStudents()} />
				))}
			</ul>
			}
			{filteredStudents.length === 0 && <EmptyPage title="Aucun élève n'est enregistré !" />}		

			{createModalOpen && (
				<Modal setOpenModal={setCreateModalOpen}>
					<ModalHeader title="Ajouter un élève"/>
					<ModalBody>
					<form className='flex flex-col justify-center items-end w-full gap-3 '>	
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
								className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style'
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
	students: PropTypes.array.isRequired,
	id: PropTypes.number.isRequired,
	loadStudents: PropTypes.func.isRequired
}

export default ListStudents;