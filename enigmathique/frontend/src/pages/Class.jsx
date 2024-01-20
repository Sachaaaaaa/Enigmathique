import React from 'react';
import LayoutProf from "../layouts/LayoutProf";
import Modal, {ModalBody, ModalHeader} from '../components/Modal';

import Course from "../models/course.model";
import ClassElement from '../components/class/ClassElement';
import {useState, useEffect} from 'react';

import CreateButton from 'components/dashboard/CreateButton';
import ContentHeader from 'components/dashboard/ContentHeader';
import TableContainer from 'components/dashboard/TableContainer';
import Notification from 'components/Notification';
import toast from 'react-hot-toast';
import {useLocation} from 'react-router-dom';


const Class = () => {

	const [courses, setCourses] = useState([]);
	const [createModalOpen, setCreateModalOpen] = useState(false);
	const [name, setName] = useState('');

	const loadClasses = async () => {
		const data = await Course.getAll();
		setCourses(data);
		//console.log(data);
	}

	useEffect(() => {
		loadClasses();
	}, []);


	const handleClickCreate = async (event) => {
		event.preventDefault();
		await toast.promise(Course.create(name), {
			loading: 'Ajout...',
			success: 'Classe ajoutée !',
			error: "Une erreur s'est produite"
			}
		);
		loadClasses();
		setCreateModalOpen(false);
		setName('');
	}

	return (
		<LayoutProf>
			<main>
				{/* Notification feedback */}
				<Notification/>
				<ContentHeader title="" link='/dashboard'>
						<CreateButton title="Ajouter une classe" onClick={() => setCreateModalOpen(true)}/>
				</ContentHeader>
				<TableContainer headers={['Nom','élèves', 'Dernière partie', 'Action']}>
					{courses.map((classe,index) => (
							<ClassElement key={classe.id} index={index} classe={classe} onChange={() => loadClasses()}/>
						))}
				</TableContainer>


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
								type='submit'
								className='modal-validate-button-style bg-gradient-to-r from-[#4C49ED] to-[#0A06F4]'
								onClick={(event) => handleClickCreate(event)}>
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
			</main>
		</LayoutProf>
	);
};

export default Class;
