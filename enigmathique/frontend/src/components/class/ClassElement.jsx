import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Modal, {ModalBody, ModalHeader} from '../Modal';
import {MdDeleteForever, MdOutlineModeEdit} from 'react-icons/md';
import { IoPerson } from "react-icons/io5";
import Course from "../../models/course.model";
import { IoIosStats } from "react-icons/io";
import Game from "../../models/game.model";
import PropTypes from 'prop-types';

const ClassElement = ({classe, onChange,index}) => {

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
		<tr value={classe.name} key={index} className={`border-t-[1px] border-[#CECDFD] ${index % 2 === 0 ? 'bg-[#4C49ED]/[.06]' : 'bg-[#4C49ED]/[.02]'}`}>
			<td className="pl-5 td-style">
				{classe.name}
			</td>
			<td className="td-style">
				<Link to={`/class/${classe.id}`} className='w-fit btn-utils-see'>
						<IoPerson size='1em'/>
						<p>Voir les élèves</p>

				</Link>
			</td>
			<td className="td-style">
				{getLastGame(gamesOf)}
			</td>

			<td className="td-style text-right pr-5">
			<div className='space-x-3'>
				<Link to='/' >
					<button
						title='Statistiques'
						className='btn-utils btn-utils-course-student-Statistiques p-2 '>
						<IoIosStats size='1.25em'/>
					</button>
				</Link>
				<button
					title='Modifier'
					className='btn-utils btn-utils-course-student-Modifier p-2'
					onClick={() => setEditModalOpen(true)}>
					<MdOutlineModeEdit size='1.25em'/>
				</button>
				<button
					title='Supprimer'
					className='btn-utils btn-utils-course-student-Supprimer p-2'
					onClick={() => setDeleteModalOpen(true)}>
					<MdDeleteForever size='1.25em'/>
				</button>
			</div>
			</td>
			{editModalOpen && (
				<Modal setOpenModal={setEditModalOpen}>
					<ModalHeader title="Modifier une classe"/>
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
								defaultValue={classe.name}
								onChange={(e) => setName(e.target.value)}
								className='form-inputfield-style  '/> 
							</div>
							<button
								type='submit'
								className='modal-validate-button-style bg-gradient-to-r from-[#4C49ED] to-[#0A06F4]'
								onClick={(event) => handleClickEdit(event, classe.id)}>
								Modifier
							</button>
							<button
								className='modal-cancel-button-style'
								onClick={() => setEditModalOpen(false)}>
								Annuler
							</button>
						</form>
					</ModalBody>
				</Modal>)}
			{deleteModalOpen && (
				<Modal setOpenModal={setDeleteModalOpen}>
					<ModalHeader title={`Supprimer une classe`}/>
					<ModalBody>
						<form className='flex flex-col text-center w-full gap-3'>
							<p className=' block text-sm font-medium mb-5 primary-font-color'>Êtes-vous sûr de vouloir supprimer la classe {classe.name} ?</p>
							<button
								type='submit'
								className='modal-validate-button-style bg-[#ef4565] hover:bg-red-500'
								onClick={(event) => handleClickDelete(event, classe.id)}>
								Supprimer
							</button>
							<button
								className='modal-cancel-button-style'
								onClick={() => setDeleteModalOpen(false)}>
								Annuler
							</button>
						</form>
					</ModalBody>
				</Modal>)}
		</tr>
	)
}

ClassElement.propTypes = {
	classe: PropTypes.object.isRequired,
	onChange: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired,
}

export default ClassElement;