import React, {useEffect} from 'react';
import Counter from './Counter';
import {initialFormData, useCreationGameContext} from "../../contexts/CreationGame.context";
import '../../../index.css';
import '../createGame.css'
import ClassList from "./ClassList";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import ContentHeader from 'components/dashboard/ContentHeader';
import Textfield from 'components/authform/Textfield';
import FooterButtons from '../FooterButtons';
import toast from "react-hot-toast";


const CreationGame1 = (props) => {

	const {formData, setFormData} = useCreationGameContext();


	const handleSuivant = () => {
		if (formData.gameName !== '' && formData.course !== 0) {
			props.setStep(2);
			return;
		}
		let messages = ['Veuillez remplir le(s) champ(s) suivant(s) :'];
		if (formData.gameName === '') {
			messages.push('-Nom de la partie');
		}
		if (formData.course === 0) {
			messages.push('-Classe');
		}
		toast.error(
			messages.join('\n'),
		);
	};
	const handleAnnuler = (event) => {
		if (confirm("Etes-vous sûr de vouloir quitter la création de la partie ?")) {
			setFormData(initialFormData)
			return;
		}
		event.preventDefault();
	}

	return (

		<section className='flex flex-col justify-center items-center w-full h-[calc(100%-26px)] min-h-[400px] '>
			<ContentHeader title='Paramètres' link='/dashboard' onClick={handleAnnuler}/>

			{/* Formulaire des paramètres de la partie */}
			<article className="flex flex-col justify-center items-center w-[25%] min-w-[300px] h-full px-5">

					<Textfield
						label='Nom de la partie'
						name='gameName'
						type='text'
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
			<FooterButtons link='/dashboard' handleRetour={handleAnnuler} handleSuivant={handleSuivant}/>
		</section>
	);

};
CreationGame1.propTypes = {
	setStep: PropTypes.func.isRequired,
}
export default CreationGame1;