import React, {useEffect, useState} from 'react';
import Modal, {ModalBody, ModalHeader} from './Modal';
import PropTypes from 'prop-types';
import StudentService from '../services/student.service';
import {MdDeleteForever, MdOutlineModeEdit} from 'react-icons/md';
import {ImStatsDots} from 'react-icons/im';


const ClassElement = ({student, onChange}) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const URL = window.location.href;
	const id = URL.substring(URL.lastIndexOf('/') + 1);


	const handleClickDelete = (event, id) => {
		console.log('Delete ' + id);
		StudentService.deleteId(id)
			.then((response) => {
				console.log(response);
				onChange();
			});
		setDeleteModalOpen(false);
	}


	const handleClickEdit = (event, firstname,lastname, idCourse, idStudent) => {
		event.preventDefault();
		StudentService.edit(firstname, lastname, idCourse, idStudent)
			.then((response) => {
				console.log(response);
				onChange();
			});
		setEditModalOpen(false)
	}



	return (
		<li key={student.id} value={student.firstname} className='bg-gray-200 flex-col space-y-3 p-1 h-[20%] rounded-2xl'>
			<figure className="bg-amber-200 w-[100px] h-[100px] rounded-full mx-auto"></figure>
			<h3 className='w-40 text-center'>{`${student.firstname} ${student.lastname}`}</h3>
			<div className="flex justify-center space-x-2">
				<button className='btn-utils-course-student'><ImStatsDots color='white' size='1.5em'/></button>
				<button className='btn-utils-course-student-edit' onClick={() => setEditModalOpen(true)}>
					<MdOutlineModeEdit color='white' size='1.5em'/></button>
				<button className='btn-utils-course-student-delete' onClick={() => setDeleteModalOpen(true)}>
					<MdDeleteForever color='white' size='1.5em'/></button>
			</div>
			{editModalOpen && (
				<Modal setOpenModal={setEditModalOpen}>
					<ModalHeader>
						<h1 className='text-3xl text-center'>{`Modifier l'élève ${student.firstname} ${student.lastname}`} </h1>
					</ModalHeader>
					<ModalBody>
						<form className='flex flex-col space-y-5'>
							<label htmlFor='firstname'>Prénom</label>
							<input type='text' name='firstname' id='firstname' defaultValue={firstname} onChange={(e) => setFirstname(e.target.value)} className='border-2 border-blue-900 rounded-md'/>
							<label htmlFor='lastname'>Nom</label>
							<input type='text' name='lastname' id='lastname' defaultValue={lastname} onChange={(e) => setLastname(e.target.value)} className='border-2 border-blue-900 rounded-md'/>
							<button className='btn-delete' onClick={() => setEditModalOpen(false)}>Annuler</button>
							<button type='submit' className='btn-validate' onClick={(event) => handleClickEdit(event, firstname, lastname, id, student.id)}>Valider la modification</button>
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
							<button className='btn-delete' onClick={() => setDeleteModalOpen(false)}>Annuler</button>
							<button type='submit' className='btn-validate' onClick={(event) => handleClickDelete(event, student.id)} >Valider la suppression</button>
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
	const loadClasses = () => {
		StudentService.get(props.id).then((response) => {
			console.log(response)
			setStudents(response);
		}).catch((error) => {
			console.log(error);
		});
	}
	useEffect(() => {
		loadClasses();
	}, []);

	const handleClickCreate = (event, firstname, lastname, id) => {
		event.preventDefault();
		StudentService.create(firstname, lastname, id)
			.then((response) => {
				console.log(response);
				loadClasses();
			});
		setCreateModalOpen(false);
		setFirstname('');
		setLastname('');
	}


	const [createModalOpen, setCreateModalOpen] = useState(false);

	return (
		<>
			<div className='flex justify-end p-5'>
			<button className="btn-utils-course-student text-white" onClick={() => setCreateModalOpen(true)}>Ajouter un élève
			</button>
			</div>
			<ul className='bg-blue-300 space-x-10 flex flex-wrap p-5'>
				{students.map((student) => (
					<ClassElement key={student.id} student={student} onChange={() => loadClasses()}/>
				))}
			</ul>
			{createModalOpen && (
				<Modal setOpenModal={setCreateModalOpen}>
					<ModalHeader>
						<h1 className='text-3xl text-center'>Ajouter un élève {id}</h1>
					</ModalHeader>
					<ModalBody>
						<form className='flex flex-col space-y-5'>
							<label htmlFor='firstname'>Prénom</label>
							<input type='text' name='firstname' id='firstname' value={firstname} onChange={(e) => setFirstname(e.target.value)} className='border-2 border-blue-900 rounded-md'/>
							<label htmlFor='lastname'>Nom</label>
							<input type='text' name='lastname' id='lastname' value={lastname} onChange={(e) => setLastname(e.target.value)} className='border-2 border-blue-900 rounded-md'/>
							<button className='btn-delete' onClick={() => setCreateModalOpen(false)}>Annuler</button>
							<button type='submit' className='btn-validate' onClick={(event) => handleClickCreate(event, firstname, lastname, id)}>Valider la modification
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
	onChange : PropTypes.func.isRequired,
}
export default ListStudents;