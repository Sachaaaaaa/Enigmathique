import React from 'react';
import LayoutProf from '../layouts/LayoutProf';
import Modal, {ModalBody, ModalHeader} from '../components/Modal';

import CourseModel from '../models/course.model';
import ClassElement from '../components/class/ClassElement';
import {useState, useEffect} from 'react'
import CreateButton from 'components/dashboard/CreateButton';
import ContentHeader from 'components/dashboard/ContentHeader';
import TableContainer from 'components/dashboard/TableContainer';
import Notification from 'components/Notification';
import toast from 'react-hot-toast';


const Class = () => {

	//état pour stocker les classes
	const [courses, setCourses] = useState([]);
	//état pour gérer le modal
	const [createModalOpen, setCreateModalOpen] = useState(false);
	//état pour stocker le nom de la classe dans les modals
	const [name, setName] = useState('');

	/**
	 * Permet de charger les classes à partir du modèle
	 */
	const loadClasses = async () => {
		const data = await CourseModel.getAll();
		setCourses(data);
		//console.log(data);
	};

	/**
	 * UseEffect pour charger les classes au chargement de la page
	 */
	useEffect(() => {
		loadClasses();
	}, []);

	/**
	 * Permet d'effctuer la création d'une classe
	 * @param event évènement déclachant la fonction
	 */
	const handleClickCreate = async (event) => {
		event.preventDefault();
		//Ajoute la nouvelle classe à la db et donne un retour
		await toast.promise(CourseModel.create(name), {
			loading: 'Ajout...',
			success: 'Classe ajoutée !',
			error: 'Une erreur s\'est produite'
		}
		);
		//Réinitialises les états et recharge les classes après l'ajout
		loadClasses();
		setCreateModalOpen(false);
		setName('');
	};

	return (
		<LayoutProf title='Mes classes'>
			<main>
				{/* Notification feedback */}
				<Notification/>
				<ContentHeader link='/dashboard'>
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
									className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style '
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
