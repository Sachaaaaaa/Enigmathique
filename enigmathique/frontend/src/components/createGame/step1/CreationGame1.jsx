import React from 'react';
import Counter from './Counter';
import {initialFormData, useCreationGameContext} from 'components/contexts/CreationGame.context';
import ClassList from './ClassList';
import {useState} from 'react';
import PropTypes from 'prop-types';
import ContentHeader from 'components/dashboard/ContentHeader';
import Textfield from 'components/authform/Textfield';
import FooterButtons from 'components/createGame/FooterButtons';
import toast from 'react-hot-toast';
import Modal, {ModalBody, ModalHeader} from 'components/Modal';
import { useNavigate } from 'react-router-dom';

/**
 * Composant qui affiche le formulaire de création de partie
 * @param props
 * @returns {Element}
 * @constructor
 */
const CreationGame1 = (props) => {

	const {formData, setFormData} = useCreationGameContext();
	// Gestion des retours en arrière
	const [cancelModalOpen, setCancelModalOpen] = useState(false);


	const handleSuivant = () => {
		if (formData.gameName !== '' && formData.course !== 0) {
			props.setStep(2);
			return;
		}
		if (formData.gameName === '') {
			toast.error('Veuillez entrer un nom de partie');
		}
		if (formData.course === 0) {
			toast.error('Veuillez sélectionner une classe');
		}
	};
	const handleAnnuler = (event) => {
		setCancelModalOpen(true);
		event.preventDefault();
	};

	const navigate = useNavigate();
	const handleRedirection = (event) => {
		setFormData(initialFormData);
		setCancelModalOpen(false);
		navigate('/dashboard');
	};

	return (

		<section className='flex flex-col justify-center items-center w-full h-[calc(100%-26px)] min-h-[400px] '>
			<ContentHeader title='Paramètres de partie' link='/dashboard' onClick={handleAnnuler}/>

			{/* Formulaire des paramètres de la partie */}
			<article className="flex flex-col justify-center items-center w-[25%] min-w-[300px] h-full px-5">

				<Textfield
					label='Nom de la partie'
					name='gameName'
					value={formData.gameName}
					onChange={(e) => setFormData({...formData, gameName: e.target.value})}
					placeholder='Entrer le nom'/>

				{/* Selection de la classe*/}
				<div className='w-full mb-4 primary-font-color'>
					<ClassList/>
				</div>

				{/* Selection de la taille des équipes - compteur*/}
				<div className='w-full mb-4 primary-font-color'>
					<Counter/>
				</div>
			</article>
			{/* Boutons*/}
			<FooterButtons linkRetour='/dashboard' handleRetour={handleAnnuler} handleSuivant={handleSuivant}/>

			{/* Modal de confirmation d'annulation */}
			{cancelModalOpen && (
				<Modal>
					<ModalHeader title="Retour au menu"/>
					<ModalBody>
						<form className='flex flex-col text-center w-full gap-3'>
							<p className=' block text-sm font-medium mb-5 primary-font-color'>Êtes-vous sûr de vouloir retourner au menu ?</p>
							<button
								type='submit'
								className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style'
								onClick={handleRedirection}>
                            Oui
							</button>
							<button
								className='modal-cancel-button-style'
								onClick={() => setCancelModalOpen(false)}>
                            Annuler
							</button>
						</form>
					</ModalBody>
				</Modal>)}
		</section>
	);

};
CreationGame1.propTypes = {
	setStep: PropTypes.func.isRequired,
};
export default CreationGame1;