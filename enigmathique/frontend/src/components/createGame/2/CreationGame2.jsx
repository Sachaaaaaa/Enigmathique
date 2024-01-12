import React, {useState} from 'react';
import RoomItem from './RoomItem';
import {useCreationGameContext} from '../../contexts/CreationGame.context';
import '../../../index.css';


const CreationGame2 = () => {

	const [selected, setSelected] = useState('suit');
	const {setStep} = useCreationGameContext();

	const rooms = [
		{
			name: 'Room1',
			difficulty: 'facile',
			cat: 'proba'
		},
		{
			name: 'Room2',
			difficulty: 'moyen',
			cat: 'suit'
		},
		{
			name: 'Room3',
			difficulty: 'difficile',
			cat: 'fonct'
		}
	]

	const handleChange = changeEvent => {
		setSelected(changeEvent.target.value);
	}
	const handleSuivant = () => {
		alert('Pas encore implémenté');
	}
	const handlePrecedent = () => {
		setStep(1);
	}

	return (
		<section className='flex flex-col h-full w-full'>
			<nav>
				<h2>Séléction des salles</h2>
				<label className='hover:bg-gray-300 has-[:checked]:border-b-2 border-indigo-600 w-1/4'>
					<input
						value='suit'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={selected === 'suit'}
						onChange={handleChange}
					/>
					Suites
				</label>
				<label className='hover:bg-gray-300 has-[:checked]:border-b-2 border-indigo-600'>
					<input
						value='proba'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={selected === 'proba'}
						onChange={handleChange}
					/>
					Probabilités
				</label>
				<label className='hover:bg-gray-300 has-[:checked]:border-b-2 border-indigo-600'>
					<input
						value='fonct'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={selected === 'fonct'}
						onChange={handleChange}
					/>
					Fonctions
				</label>
				<label className='hover:bg-gray-300 has-[:checked]:border-b-2 border-indigo-600'>
					<input
						value='ens'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={selected === 'ens'}
						onChange={handleChange}
					/>
					Ensembles
				</label>
			</nav>
			<section>
				{rooms.map((room, index) => (
					room.cat === selected && <RoomItem key={index} name={room.name} difficulty={room.difficulty}/>
				))}
			</section>
			<section>
				<button
					className='btn-cancel'
					type='submit'
					onClick={handlePrecedent}
				>
					Retour
				</button>
				<button
					className='btn-validate'
					type='submit'
					onClick={handleSuivant}
				>
					Suivant
				</button>
			</section>

		</section>
	);
};


export default CreationGame2;