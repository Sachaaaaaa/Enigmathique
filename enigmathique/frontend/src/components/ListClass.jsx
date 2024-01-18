import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Modal, {ModalBody, ModalHeader} from './Modal';
import {MdDeleteForever, MdOutlineModeEdit} from 'react-icons/md';
import {CiSquareMore} from 'react-icons/ci';
import PropTypes from 'prop-types';
import {FaPlus} from "react-icons/fa6";
import Course from "../models/course.model";
import {ImStatsDots} from "react-icons/im";

const ClassElement = ({classe, onChange}) => {
	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [name, setName] = useState('');

	const handleClickDelete = async (event, id) => {
		event.preventDefault();
		await Course.delete(id);
		onChange();
		setDeleteModalOpen(false);
		console.log('delete ' + id);
	}

	const handleClickEdit = async (event, id) => {
		event.preventDefault();
		const data = await Course.edit(name, id);
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
				<Modal setOpenModal={setEditModalOpen}>
					<ModalHeader title="Modifier la classe"/>
					<ModalBody>
					<form className='flex flex-col justify-center items-end w-full gap-3 '>
							<div className='w-full pb-3'>
							<label htmlFor='name' className='form-label-style primary-font-color'>
								Nom de la classe
							</label>
							<input
								type='text'
								name='name'
								id='name'
								value={name}
								placeholder='Classe'
								onChange={(e) => setName(e.target.value)}
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
								onClick={(event) => handleClickEdit(event, classe.id)}>
								Modifier
							</button>
						</form>
					</ModalBody>
				</Modal>)}
			{deleteModalOpen && (
				<Modal setOpenModal={setDeleteModalOpen}>
					<ModalHeader title={`Supprimer une classe`}/>
					<ModalBody>
						<form className='flex flex-col justify-center w-full gap-3'>
							<p className=' block text-sm font-medium mb-5 primary-font-color'>Êtes-vous sûr de vouloir supprimer la classe {classe.name} ?</p>
							<button
								className='modal-cancel-button-style'
								onClick={() => setDeleteModalOpen(false)}>
								Annuler
							</button>
							<button
								type='submit'
								className='modal-validate-button-style bg-[#ef4565] hover:bg-red-500'
								onClick={(event) => handleClickDelete(event, classe.id)}>
								Supprimer
							</button>
						</form>
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
				<Modal setOpenModal={setCreateModalOpen}>
					<ModalHeader title="Créer une classe" />
					<ModalBody>
						<form className='flex flex-col justify-center items-end w-full gap-3 '>
							<div className='w-full pb-3'>
							<label htmlFor='name' className='form-label-style primary-font-color'>
								Nom de la classe
							</label>
							<input
								type='text'
								name='name'
								id='name'
								value={name}
								placeholder='Classe'
								onChange={(e) => setName(e.target.value)}
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
								onClick={(event) => handleClickCreate(event)}>
								Créer
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
