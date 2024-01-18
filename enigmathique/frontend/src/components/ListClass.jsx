import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Modal, {ModalBody, ModalHeader} from './Modal';
import {MdDeleteForever, MdOutlineModeEdit} from 'react-icons/md';
import { IoPerson } from "react-icons/io5";
import PropTypes from 'prop-types';
import {FaPlus} from "react-icons/fa6";
import Course from "../models/course.model";
import {ImStatsDots} from "react-icons/im";
import Game from "../models/game.model";

const ClassElement = ({classe, onChange}) => {

	const [gamesOf, setGamesOf] = useState([]);

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

	const loadGamesOf = async() => {
		const data = await Game.getAll();
		let listGames = [];
		data.forEach((game) => {
			classe.id === game.idCourse && listGames.push();
		});
		setGamesOf(listGames);
	}

	useEffect(() => {
		loadGamesOf();
	}, []);

	const getLastGame = (games) => {
		if(games.length !== 0) {
			let maxDate = games[0].createdAt;
			games.forEach((game) => {
				(game.createdAt.localeCompare(maxDate) > 0) && (maxDate = game.createdAt);
			});
			return maxDate;
		} else {
			return 'Jamais joué'
		}
	}


	return (
		// className={`${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}
		<tr key={classe.id} value={classe.name} className='border-t-[1px] border-[rgba(10, 6, 244, 0.2)]'>
			<td className="pl-5 td-style">
				{classe.name}
			</td>
			<td className="td-style">
				<Link to={`/class/${classe.id}`}>
					<button
						className='btn-utils-see'>
						<IoPerson size='1em'/>
						<p>Voir les élèves</p>
					</button>
				</Link>
			</td>
			<td className="td-style">
				{getLastGame(gamesOf)}
			</td>

			<td className="td-style text-right pr-5">
			<div className='ml-auto space-x-3'>
				<Link to='/'>
					<button
						className='btn-utils btn-utils-course-student-stat '>
						<ImStatsDots color='white' size='1.25em'/>
					</button>
				</Link>
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
			</td>
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
								placeholder={classe.name}
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
		</tr>
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
					className="btn-utils btn-utils-create"
					onClick={() => setCreateModalOpen(true)}><FaPlus/><p>Créer une classe</p>
				</button>
			</div>
			<table className="w-full primary-font-color ">
				<thead className='w-full '>
					<tr className=" w-full text-left">
						<th className="pl-5 table-title ">Nom</th>
						<th className="table-title">élèves</th>
						<th className="table-title">Dernière partie</th>
						<th className="table-title text-right pr-5">Action</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
				{courses.map((classe) => (
					<ClassElement key={classe.id} classe={classe} onChange={() => loadClasses()}/>
				))}
			</table>

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
