import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import CourseService from '../services/course.service';
import Modal, {ModalBody, ModalHeader} from './Modal';
import {MdDeleteForever, MdOutlineModeEdit} from 'react-icons/md';
import {CiSquareMore} from 'react-icons/ci';
import PropTypes from 'prop-types';
import { FaPlus } from "react-icons/fa6";

const ClassElement = ({classe, onChange}) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [name, setName] = useState('');

	const handleClickDelete = (event, id) => {
		console.log('Delete ' + id);
		CourseService.deleteId(id)
			.then((response) => {
				console.log(response);
				onChange();
			});
		setDeleteModalOpen(false);
	}

	const handleClickEdit = (event, id) => {
		event.preventDefault();
		CourseService.edit(name, id)
			.then((response) => {
				console.log(response);
				onChange();
			});
		setEditModalOpen(false)
	}


	return (
		<li key={classe.id} value={classe.name} className='bg-gray-300 flex p-1 rounded-2xl'>
			<h3 className='w-40 text-center my-auto'>{classe.name}</h3>
			<Link to={`/class/${classe.id}`}>
				<button className='btn-utils-course-student-icons'><CiSquareMore size='1.5em'/><p>Voir les élèves</p></button>
			</Link>
			<div className='ml-auto space-x-3'>
				<button className='btn-utils-course-student-edit' onClick={() => setEditModalOpen(true)}><MdOutlineModeEdit
					size='1.5em'/></button>
				<button className='btn-utils-course-student-delete' onClick={() => setDeleteModalOpen(true)}>
					<MdDeleteForever size='1.5em'/></button>
			</div>
			{editModalOpen && (
				<Modal setOpenModal={setEditModalOpen} height='400'>
					<ModalHeader>
						<h1 className='text-3xl text-center'>Modifier la classe {classe.name}</h1>
					</ModalHeader>
					<ModalBody>
						<form className='flex flex-col space-y-5'>
							<label htmlFor='name'>Nom de la classe</label>
							<input type='text' name='name' id='name' defaultValue={classe.name} onChange={(e) => setName(e.target.value)} className='border-2 border-blue-900 rounded-md'/>
							<button className='btn-delete' onClick={() => setEditModalOpen(false)}>Annuler</button>
							<button type='submit' className='btn-validate' onClick={(event) => handleClickEdit(event, classe.id)}>Valider la
								modification
							</button>
						</form>
					</ModalBody>
				</Modal>)}
			{deleteModalOpen && (
				<Modal setOpenModal={setDeleteModalOpen} height='300'>
					<ModalHeader>
						<h1 className='text-3xl text-center'>Voulez vous vraiment surpprimer
							la classe {classe.id}</h1>
					</ModalHeader>
					<ModalBody>
						<div className='flex flex-col space-y-5'>
							<button className='btn-delete' onClick={() => setDeleteModalOpen(false)}>Annuler</button>
							<button type='submit' className='btn-validate' onClick={(event) => handleClickDelete(event, classe.id)}>Valider la
								suppression
							</button>
						</div>
					</ModalBody>
				</Modal>)}
		</li>
	)
}

const ListClass = () => {

	const [courses, setCourses] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [name, setName] = useState('');

	const loadClasses = () => {
		CourseService.getAll().then((response) => {
			setCourses(response);
		}).catch((error) => {
			console.log(error);
		});
	}

	useEffect(() => {
		loadClasses();
	}, []);


	const handleClickCreate = (event) => {
		event.preventDefault();
		CourseService.create(name)
			.then((response) => {
				console.log(response);
				loadClasses();
			});
		setCreateModalOpen(false);
		setName('');
	}

	return (
		<>
			<div className='flex justify-end p-5'>
				<button className="btn-utils-course-student-icons" onClick={() => setCreateModalOpen(true)}><FaPlus /><p>Créer une classe</p>
				</button>
			</div>
			<ul className='bg-blue-300 space-y-10 p-5'>
				{courses.map((classe) => (
					<ClassElement key={classe.id} classe={classe} onChange={() => loadClasses()}/>
				))}
			</ul>
			{createModalOpen && (
				<Modal setOpenModal={setCreateModalOpen} height='400'>
					<ModalHeader>
						<h1 className='text-3xl text-center'>{`Création d'une classe`}</h1>
					</ModalHeader>
					<ModalBody>
						<form className='flex flex-col space-y-5'>
							<label htmlFor='name'>Nom de la classe</label>
							<input type='text' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-blue-900 rounded-md'/>
							<button className='btn-delete' onClick={() => setCreateModalOpen(false)}>Annuler</button>
							<button type='submit' className='btn-validate' onClick={handleClickCreate}>Valider la création</button>
						</form>
					</ModalBody>
				</Modal>)}
		</>
	);
};

ClassElement.propTypes = {
	classe: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
}

export default ListClass;
