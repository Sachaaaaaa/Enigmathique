import React, {useEffect, useState} from 'react';
import Modal, {ModalBody, ModalHeader} from '../Modal';
import PropTypes from 'prop-types';
import {MdArrowBackIos} from 'react-icons/md';
import {FaPlus} from "react-icons/fa6";
import {Link} from 'react-router-dom';
import SearchInput from "../SearchInput";
import Student from "../../models/student.model";
import StudentElement from "./StudentElement";
import ContentHeader from 'components/dashboard/ContentHeader';

const ListStudents = (props) => {
	
	const [students, setStudents] = useState([]);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	// TODO : récupérer l'id de la classe
	const URL = window.location.href;
	const id = URL.substring(URL.lastIndexOf('/') + 1);
	/**
	 * récupère la liste de tous les élèves de la classe
	 */
	const loadStudents = async () => {
		const data = await Student.getAll(props.id);
		setStudents(data);
		console.log(data);
	}
	
	useEffect(() => {
		loadStudents();
	}, []);
	
	const handleClickCreate = async (event, firstname, lastname, idCourse) => {
		event.preventDefault();
		await Student.create(firstname, lastname, idCourse);
		loadStudents();
		setCreateModalOpen(false);
		console.log('create ' + id);
		setFirstname('');
		setLastname('');
	}
	
	const [filter, setFilter] = useState({text: ''});
	const handleChangeText = (e) => {
		console.log(filter);
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
				<div className='flex justify-end gap-3 p-5 pr-0'>
					<SearchInput handleChangeText={handleChangeText}/>
					<button
						className="btn-utils btn-utils-create"
						onClick={() => setCreateModalOpen(true)}><FaPlus/><p>Ajouter un élève</p>
					</button>
				</div>
			</ContentHeader> 

			<ul className='flex flex-wrap gap-5 p-5 pb-5'>
				{filteredStudents.map((student) => (
					<StudentElement key={student.id} student={student} onChange={() => loadStudents()}/>
				))}
			</ul>
			{createModalOpen && (
				<Modal setOpenModal={setCreateModalOpen}>
					<ModalHeader title="Ajouter un élève"/>
					<ModalBody>
					<form className='flex flex-col justify-center items-end w-full gap-3 '>
						<div className='w-full pb-3'>
							<label htmlFor='firstname' className='form-label-style primary-font-color'>
								{"Prénom de l'élève"}
							</label>
							<input
								type='text'
								name='firstname'
								id='firstname'
								placeholder='Prénom'
								onChange={(e) => setFirstname(e.target.value)}
								className='form-inputfield-style  '/> 
						</div>
						<div className='w-full pb-3'>
							<label htmlFor='lastname' className='form-label-style primary-font-color'>
								{"Nom de l'élève"}
							</label>
							<input
								type='text'
								name='lastname'
								id='lastname'
								placeholder='Nom'
								onChange={(e) => setLastname(e.target.value)}
								className='form-inputfield-style  '/> 
							</div>
							<button
								type='submit'
								className='modal-validate-button-style bg-gradient-to-r from-[#4C49ED] to-[#0A06F4]'
								onClick={(event) => handleClickCreate(event, firstname, lastname, id)}>
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