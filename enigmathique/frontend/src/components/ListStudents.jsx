import React, {useEffect, useState} from 'react';
import Modal, {ModalBody, ModalHeader} from './Modal';
import PropTypes from 'prop-types';
import {MdDeleteForever, MdOutlineModeEdit, MdArrowBackIos} from 'react-icons/md';
import { IoIosStats } from "react-icons/io";
import {FaPlus} from "react-icons/fa6";
import {Link} from 'react-router-dom';
import SearchInput from "./SearchInput";
import Student from "../models/student.model";

const ClassElement = ({student, onChange}) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const URL = window.location.href;
	const id = URL.substring(URL.lastIndexOf('/') + 1);
	
	
	const handleClickDelete = async (event, id) => {
		event.preventDefault();
		await Student.delete(id);
		onChange();
		setDeleteModalOpen(false);
		console.log('delete ' + id);
	}
	
	
	const handleClickEdit = async (event, firstname, lastname, idCourse, idStudent) => {
		event.preventDefault();
		await Student.edit(firstname, lastname, idCourse, idStudent);
		onChange();
		setEditModalOpen(false);
		console.log('edit ' + id);
	}
	
	
	return (
		<li key={student.id} value={student.firstname}
				className='bg-gray-200 flex-col p-1 h-[250px] w-[250px] rounded-2xl drop-shadow-md'>
			<section className='flex flex-col h-full space-y-1'>
				<figure className="bg-amber-200 w-[100px] h-[100px] rounded-full mx-auto">
				</figure>
				<h3 className='w-40 mx-auto text-center'>
					{`${student.firstname} ${student.lastname}`}
				</h3>
				<div className="flex-grow"></div>
				<div className="flex justify-center space-x-5 mt-auto">
					<button
						className='btn-utils btn-utils-course-student-stat'>
						<IoIosStats color='white' size='1.25em'/>
					</button>
					<button
						className='btn-utils btn-utils-course-student-edit'
						onClick={() => setEditModalOpen(true)}>
						<MdOutlineModeEdit size='1.25em'/>
					</button>
					<button
						className='btn-utils btn-utils-course-student-delete'
						onClick={() => setDeleteModalOpen(true)}>
						<MdDeleteForever size='1.25em'/>
					</button>
				</div>
			</section>
			{editModalOpen && (
				<Modal setOpenModal={setEditModalOpen}>
					<div className='w-full bg-white rounded-t-lg flex flex-col justify-center items-start border-b-2 box-border border-white-color'>
						<h1 className='text-lg font-semibold primary-font-color text-center py-2 px-5'>Modifier un élève</h1>
					</div>
				<ModalBody>
				<form className='flex flex-col justify-center items-end w-full gap-2 '>
						<div className='w-full pb-1'>
						<input
							type='text'
							name='firstname'
							id='firstname'
							defaultValue={student.firstname}
								onChange={(e) => setFirstname(e.target.value)}
							className='form-inputfield-style  '/> 
						</div>
						<div className='w-full pb-1'>
						<input
							type='text'
							name='lastname'
							id='lastname'
							defaultValue={student.lastname}
							onChange={(e) => setLastname(e.target.value)}
							className='form-inputfield-style  '/> 
						</div>
						<button
							className='modal-cancel-button-style'
							onClick={() => setEditModalOpen(false)}>
							Annuler
						</button>
						<button
							type='submit'
							className='modal-validate-button-style bg-gradient-to-r from-[#4C49ED] to-[#0A06F4]'
							onClick={(event) => handleClickEdit(event, firstname, lastname, id, student.id)}>
							Modifier
						</button>
					</form>
				</ModalBody>
			</Modal>)}
			{deleteModalOpen && (
				<Modal setOpenModal={setDeleteModalOpen} width='250' height='250'>
							<div className='w-full bg-white rounded-t-lg flex flex-col justify-center items-start border-b-2 box-border border-white-color'>
								<h1 className='text-lg font-semibold primary-font-color text-center py-2 px-5'>Supprimer un élève</h1>
							</div>

					<ModalBody>
						<form className='flex flex-col space-y-2'>
							<p className=' block text-sm text-justify font-medium mb-2 primary-font-color'>Êtes-vous sûr de vouloir supprimer {"l'élève"} {student.firstname} {student.lastname} ?</p>
							<button
								className='modal-cancel-button-style'
								onClick={() => setDeleteModalOpen(false)}>
								Annuler
							</button>
							<button
								type='submit'
								className='modal-validate-button-style bg-[#ef4565] hover:bg-red-500'
								onClick={(event) => handleClickDelete(event, student.id)}>
								Supprimer
							</button>
						</form>
					</ModalBody>
				</Modal>)}
		</li>
	)
}
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
			<div className='flex justify-end gap-3 p-5'>
				<SearchInput handleChangeText={handleChangeText}/>
				<button
					className="btn-utils btn-utils-create"
					onClick={() => setCreateModalOpen(true)}><FaPlus/><p>Ajouter un élève</p>
				</button>
			</div>
			<nav className='flex flex-row justify-end w-full p-5 gap-12'>
				<Link to='/class' className='mr-auto'>
					<button
						className="h-full p-1">
						<MdArrowBackIos size='1em'/>
					</button>
				</Link>
				<p>Élèves</p>

			</nav>
			<ul className='bg-blue-300 flex flex-wrap p-5'>
				{filteredStudents.map((student) => (
					<ClassElement key={student.id} student={student} onChange={() => loadStudents()}/>
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
								className='modal-cancel-button-style'
								onClick={() => setCreateModalOpen(false)}>
								Annuler
							</button>
							<button
								type='submit'
								className='modal-validate-button-style bg-gradient-to-r from-[#4C49ED] to-[#0A06F4]'
								onClick={(event) => handleClickCreate(event, firstname, lastname, id)}>
								Créer
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

ClassElement.propTypes = {
	student: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
}
export default ListStudents;