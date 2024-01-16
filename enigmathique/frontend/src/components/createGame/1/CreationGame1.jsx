import React, {useEffect} from 'react';
import Counter from './Counter';
import {initialFormData, useCreationGameContext} from "../../contexts/CreationGame.context";
import '../../../index.css';
import '../createGame.css'
import ClassList from "./ClassList";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
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
		alert(messages.join('\n'));
	};
	const handleAnnuler = (event) => {
		if (confirm("Etes-vous sûr de vouloir quitter la création de la partie ?")) {
			setFormData(initialFormData)
			return;
		}
		event.preventDefault();
	}

	return (

		<section className='flex flex-col h-[96%] w-full gap-4'>
			<section className="h-[5%]">
				<h1 className='text-2xl pl-4'>Paramètres</h1>
			</section>
			<section className=" h-[85%] flex flex-col justify-center items-center">
				<div>
					<div className='mb-4'>
						<label
							className='label-creation'
							htmlFor='gameName'
						>
							Nom de la partie
						</label>
						<input
							id='gameName'
							value={formData.gameName}
							onChange={(e) => setFormData({...formData, gameName: e.target.value})}
							placeholder='Entrer le nom'
							className='data-selection'
						/>
					</div>
					<div className='mb-4'>
						<ClassList/>
					</div>
					<div className='mb-4 w-full'>
						<Counter/>
					</div>
				</div>
			</section>
			<section className="flex flex-row justify-evenly items-end h-[10%] w-full">
				<Link
					className='btn-cancel'
					to={'/dashboard'}
					onClick={handleAnnuler}
				>
					Retour
				</Link>
				<button
					className='btn-validate'
					onClick={handleSuivant}
				>
					Suivant
				</button>
			</section>

		</section>
	);

};
CreationGame1.propTypes = {
	setStep: PropTypes.func.isRequired,
}
export default CreationGame1;