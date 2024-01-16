import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Modal, {ModalBody, ModalHeader} from './Modal';
import {MdDeleteForever, MdOutlineModeEdit} from 'react-icons/md';
import {CiSquareMore} from 'react-icons/ci';
import PropTypes from 'prop-types';
import {FaPlus} from "react-icons/fa6";
import Course from "../models/course.model";
import courseModel from "../models/course.model";
import {ImStatsDots} from "react-icons/im";

const ClassElement = ({classe, onChange}) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [name, setName] = useState('');

	const handleClickDelete = async (event, id) => {
		event.preventDefault();
		await courseModel.delete(id);
		onChange();
		setDeleteModalOpen(false);
		console.log('delete ' + id);
	}

	const handleClickEdit = async (event, id) => {
		event.preventDefault();
		const data = await courseModel.edit(name, id);
		onChange();
		setEditModalOpen(false);
		console.log('edit ' + id);
	}


	return (
		<li key={classe.id} value={classe.name} className='bg-gray-300 flex p-1 rounded-2xl'>
			<h3 className='w-40 text-center my-auto'>
				{classe.name}
			</h3>
			<Link to={`/class/${classe.id}`}>
				<button
					className='btn-utils btn-utils-course-student-icons'>
					<CiSquareMore size='1.5em'/>
					<p>Voir les élèves</p>
				</button>
			</Link>
			<div className='ml-auto space-x-3'>
				<Link to='/'>
					<button
						className='btn-utils btn-utils-course-student-stat'>
						<ImStatsDots color='white' size='1.5em'/>
					</button>
				</Link>
				<button
					className='btn-utils btn-utils-course-student-edit'
					onClick={() => setEditModalOpen(true)}>
					<MdOutlineModeEdit size='1.5em'/>
				</button>
				<button
					className='btn-utils btn-utils-course-student-delete'
					onClick={() => setDeleteModalOpen(true)}>
					<MdDeleteForever size='1.5em'/>
				</button>
			</div>
			{editModalOpen && (
				<Modal setOpenModal={setEditModalOpen} height='400'>
					<ModalHeader>
					<h1 className='text-3xl text-center'>
							Modifier la classe {classe.name}
						</h1>
					</ModalHeader>
					<ModalBody>
						<form className='flex flex-col space-y-5'>
							<label htmlFor='name'>
								Nom de la classe
							</label>
							<input
								type='text'
								name='name'
								id='name'
								defaultValue={classe.name}
								onChange={(e) => setName(e.target.value)}
								className='border-2 border-blue-900 rounded-md'/>
							<button
								className='btn-delete'
								onClick={() => setEditModalOpen(false)}>
								Annuler
							</button>
							<button
								type='submit'
								className='btn-validate'
								onClick={(event) => handleClickEdit(event, classe.id)}>
								Valider la modification
							</button>
						</form>
					</ModalBody>
				</Modal>)}
			{deleteModalOpen && (
				<Modal setOpenModal={setDeleteModalOpen} height='300'>
					<ModalHeader>
						<h1 className='text-3xl text-center'>
							Voulez vous vraiment surpprimer la classe {classe.id}
						</h1>
					</ModalHeader>
					<ModalBody>
						<div className='flex flex-col space-y-5'>
							<button
								className='btn-delete'
								onClick={() => setDeleteModalOpen(false)}>
								Annuler
							</button>
							<button
								type='submit'
								className='btn-validate'
								onClick={(event) => handleClickDelete(event, classe.id)}>
								Valider la suppression
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

	const loadClasses = async () => {
		const data = await Course.getAll();
		setCourses(data);
		console.log(data);
	}

	useEffect(() => {
		loadClasses();
	}, []);


	const handleClickCreate = async (event) => {
		event.preventDefault();
		const data = await Course.create(name);
		console.log(data);
		loadClasses();
		setCreateModalOpen(false);
		setName('');
	}

	return (
		<>
			<div className='flex justify-end p-5'>
				<button
					className="btn-utils btn-utils-course-student-icons"
					onClick={() => setCreateModalOpen(true)}><FaPlus/><p>Créer
					une classe</p>
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
							<label htmlFor='name'>
								Nom de la classe
							</label>
							<input
								type='text'
								name='name'
								id='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								className='border-2 border-blue-900 rounded-md'/>
							<button
								className='btn-delete'
								onClick={() => setCreateModalOpen(false)}>
								Annuler
							</button>
							<button
								type='submit'
								className='btn-validate'
								onClick={(event) => handleClickCreate(event)}>
								Valider la création
							</button>
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
