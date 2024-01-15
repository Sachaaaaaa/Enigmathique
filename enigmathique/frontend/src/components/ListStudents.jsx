import React, {useEffect, useState} from 'react';
import Modal, {ModalBody, ModalHeader} from './Modal';
import PropTypes from 'prop-types';
import StudentService from '../services/student.service';
import {MdDeleteForever, MdOutlineModeEdit, MdArrowBackIos} from 'react-icons/md';
import {ImStatsDots} from 'react-icons/im';
import {FaPlus} from "react-icons/fa6";
import {Link} from 'react-router-dom';
import {FaSearch} from "react-icons/fa";

const ClassElement = ({student, onChange}) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const URL = window.location.href;
	const id = URL.substring(URL.lastIndexOf('/') + 1);
	
	
	const handleClickDelete = (event, id) => {
		console.log('Delete ' + id);
		StudentService.deleteId(id).then((response) => {
			console.log(response);
			onChange();
		}).catch((error) => {
			console.log(error);
		});
		setDeleteModalOpen(false);
	}
	
	
	const handleClickEdit = (event, firstname, lastname, idCourse, idStudent) => {
		event.preventDefault();
		StudentService.edit(firstname, lastname, idCourse, idStudent).then((response) => {
			console.log(response);
			onChange();
		}).catch((error) => {
			console.log(error);
		});
		setEditModalOpen(false)
	}
	
	
	return (
		<li key={student.id} value={student.firstname}
				className='bg-gray-200 flex-col space-y-3 m-3  p-1 h-[250px] w-[250px] rounded-2xl'>
			<section className='flex flex-col h-full space-y-1'>
				<figure className="bg-amber-200 w-[100px] h-[100px] rounded-full mx-auto">
				</figure>
				<h3 className='w-40 mx-auto text-center'>
					{`${student.firstname} ${student.lastname}`}
				</h3>
				<div className="flex-grow"></div>
				<div className="flex justify-center space-x-2 mt-auto">
					<button
						className='btn-utils-course-student'>
						<ImStatsDots color='white' size='1.5em'/>
					</button>
					<button
						className='btn-utils-course-student-edit'
						onClick={() => setEditModalOpen(true)}>
						<MdOutlineModeEdit size='1.5em'/>
					</button>
					<button
						className='btn-utils-course-student-delete'
						onClick={() => setDeleteModalOpen(true)}>
						<MdDeleteForever size='1.5em'/>
					</button>
				</div>
			</section>
			{editModalOpen && (
				<Modal setOpenModal={setEditModalOpen}>
					<ModalHeader>
						<h1 className='text-3xl text-center'>{`Modifier l'élève ${student.firstname} ${student.lastname}`}
						</h1>
					</ModalHeader>
					<ModalBody>
						<form className='flex flex-col space-y-5'>
							<label htmlFor='firstname'>Prénom</label>
							<input
								type='text'
								name='firstname'
								id='firstname'
								defaultValue={student.firstname}
								onChange={(e) => setFirstname(e.target.value)}
								className='border-2 border-blue-900 rounded-md'/>
							<label htmlFor='lastname'>Nom</label>
							<input
								type='text'
								name='lastname'
								id='lastname'
								defaultValue={student.lastname}
								onChange={(e) => setLastname(e.target.value)}
								className='border-2 border-blue-900 rounded-md'/>
							<button
								className='btn-delete'
								onClick={() => setEditModalOpen(false)}>
								Annuler
							</button>
							<button
								type='submit'
								className='btn-validate'
								onClick={(event) => handleClickEdit(event, firstname, lastname, id, student.id)}>
								Valider la modification
							</button>
						</form>
					</ModalBody>
				</Modal>)}
			{deleteModalOpen && (
				<Modal setOpenModal={setDeleteModalOpen} height='300'>
					<ModalHeader>
						<h1 className='text-3xl text-center'>{`Voulez vous vraiment surpprimer
										l'élève ${student.firstname} ${student.lastname}`}</h1>
					</ModalHeader>
					<ModalBody>
						<form className='flex flex-col space-y-5'>
							<button
								className='btn-delete'
								onClick={() => setDeleteModalOpen(false)}>
								Annuler
							</button>
							<button
								type='submit'
								className='btn-validate'
								onClick={(event) => handleClickDelete(event, student.id)}>
								Valider la suppression
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
	const loadStudents = () => {
		StudentService.get(props.id).then((response) => {
			console.log(response)
			setStudents(response);
		}).catch((error) => {
			console.log(error);
		});
	}
	
	
	useEffect(() => {
		loadStudents();
	}, []);
	
	const handleClickCreate = (event, firstname, lastname, id) => {
		event.preventDefault();
		StudentService.create(firstname, lastname, id).then((response) => {
			console.log(response);
			loadStudents();
		}).catch((error) => {
			console.log(error);
		});
		setCreateModalOpen(false);
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
			<nav className='flex flex-row justify-end w-full p-5 gap-12'>
				<Link to='/class' className='mr-auto'>
					<button className="btn-back h-full"><MdArrowBackIos size='1.5em'/><p>Élèves</p></button>
				</Link>
				<section className='flex flex-row items-center justify-center bg-white rounded-full p-4 gap-2 shadow'>
					<FaSearch color="#0a06f4"/>
					<input
						type='text'
						placeholder='Rechercher'
						onChange={handleChangeText}
						className="focus:border-transparent"
					/>
				</section>
				<button
					className="btn-utils-course-student-icons"
					onClick={() => setCreateModalOpen(true)}><FaPlus size='1.5em'/>
					<p>Ajouter un élève</p>
				</button>
			</nav>
			<ul className='bg-blue-300 flex flex-wrap p-5'>
				{filteredStudents.map((student) => (
					<ClassElement key={student.id} student={student} onChange={() => loadStudents()}/>
				))}
			</ul>
			{createModalOpen && (
				<Modal setOpenModal={setCreateModalOpen}>
					<ModalHeader>
						<h1 className='text-3xl text-center'>Ajouter un élève {id}</h1>
					</ModalHeader>
					<ModalBody>
						<form className=' flex flex-col space-y-5'>
							<label htmlFor='firstname'>Prénom</label>
							<input
								type='text'
								name='firstname'
								id='firstname'
								value={firstname} onChange={(e) => setFirstname(e.target.value)}
								className='border-2 border-blue-900 rounded-md'/>
							<label htmlFor='lastname'>Nom</label>
							<input
								type='text'
								name='lastname'
								id='lastname'
								value={lastname} onChange={(e) => setLastname(e.target.value)}
								className='border-2 border-blue-900 rounded-md'/>
							<button className='btn-delete' onClick={() => setCreateModalOpen(false)}>Annuler</button>
							<button
								type='submit'
								className='btn-validate'
								onClick={(event) => handleClickCreate(event, firstname, lastname, id)}>
								Valider la modification
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