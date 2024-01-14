import React, {useEffect} from 'react';
import Counter from './Counter';
import {initialFormData, useCreationGameContext} from "../../contexts/CreationGame.context";
import '../../../index.css';
import '../createGame.css'
import ClassList from "./ClassList";
import CourseService from "../../../services/course.service";
import AuthService from "../../../services/auth.service";
import {Link} from "react-router-dom";
const GameCreationForm = () => {

	const {formData, setFormData, setStep, setCourses} = useCreationGameContext();
	console.log(formData);

	// AuthService.login('admin@admin.com', 'admin').then((response) => {
	// 	console.log(response);
	// }).catch((error) => {
	// 	console.log(error);
	// });

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


	const handleSuivant = () => {
		if (formData.gameName !== '' && formData.course !== 0) {
			setStep(2);
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

		<section className='flex flex-col items-center h-full w-full'>
			<section className="w-full">
				<h1 className='text-2xl pl-4'>Paramètres</h1>
			</section>
			<section className="w-1/3">
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
			</section>
			<section className="flex flex-row justify-evenly items-end h-1/2 w-5/6">
				<Link
					className='btn-cancel'
					to={'/dashboard'}
					onClick={handleAnnuler}
				>
					Annuler
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

export default GameCreationForm;