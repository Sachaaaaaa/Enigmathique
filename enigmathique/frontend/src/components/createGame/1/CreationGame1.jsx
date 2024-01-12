import React, {useState} from 'react';
import Counter from './Counter';
import {useCreationGameContext} from "../../contexts/CreationGame.context";
const GameCreationForm = () => {

	const [gameName, setGameName] = useState('');
	const {formData, setFormData} = useCreationGameContext();


	const ClassList = () => {
		const classes = ['seconde A', 'seconde B', 'seconde C'];
		const options = classes.map((classe) => <option key={classe} value={classe}>{classe}</option>);
		console.log(options)
		return(
			<>
				<label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
				<select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					{options}
				</select>
			</>
		);
	};

	const handleSuivant = (e) => {
		// Empêcher le rechargement de la page
		e.preventDefault();
		// Réinitialiser le message d'erreur
		alert('accès à la page suivante');
	};

	return (
		<section className='flex flex-col items-center justify-center h-full w-full'>
			<form
				onSubmit={handleSuivant}

			>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='gameName'
					>
						Nom de la partie
					</label>
					<input
						type='text'
						id='gameName'
						name='gameName'
						value={gameName}
						onChange={(e) => setGameName(e.target.value)}
						placeholder='Entrer le nom'
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						required
					/>
				</div>
				<div className='mb-4'>
					<ClassList/>
				</div>
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='username'
					>Taille de l&apos;équipe
					</label>
					<Counter/>
				</div>
			</form>
		</section>
	);

};

export default GameCreationForm;