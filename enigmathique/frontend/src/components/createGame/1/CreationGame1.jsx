import React from 'react';
import Counter from './Counter';
import {useCreationGameContext} from "../../contexts/CreationGame.context";
import '../../../index.css';
import ClassList from "./ClassList";
import courseService from "../../../services/course.service";
const GameCreationForm = () => {

	const {formData, setFormData, setStep} = useCreationGameContext();
	console.log(formData);

	courseService.getAll().then(res => console.log(res));



	const classes = [
		{name:'Seconde 1', id:1},
		{name:'Seconde 2', id:2},
		{name:'Seconde 3', id:3},
		{name:'Seconde 4', id:4},
	];


	const handleSuivant = () => {
		setStep(2);
	};

	return (
		<>
			<section className='flex flex-col items-center justify-center h-full w-full'>
				<section>
					<div className='mb-4'>
						<label
							className='block text-gray-700 text-sm font-bold mb-2'
							htmlFor='gameName'
						>
							Nom de la partie
						</label>
						<input
							id='gameName'
							value={formData.gameName}
							onChange={(e) => setFormData({...formData, gameName: e.target.value})}
							placeholder='Entrer le nom'
							className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						/>
					</div>
					<div className='mb-4'>
						<ClassList classes={classes}/>
					</div>
					<div className='mb-4'>
						<Counter/>
					</div>
				</section>
				<button
					className='btn-validate'
					onClick={handleSuivant}
				>
					Suivant
				</button>
			</section>
		</>
	);

};

export default GameCreationForm;