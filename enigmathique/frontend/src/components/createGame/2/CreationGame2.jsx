import React, {useState} from 'react';
import {initialFormData, useCreationGameContext} from '../../contexts/CreationGame.context';
import '../../../index.css';
import {Link} from 'react-router-dom';
import RoomNav from "./RoomNav";
import Room from "./Room";

const CreationGame2 = () => {

	const [selected, setSelected] = useState('suit');
	const {setStep, setFormData} = useCreationGameContext();

	const rooms = [
		{
			id:1,
			name: 'La menuiserie Seguin',
			difficulty: 'Facile',
			cat: 'proba',
			riddles: 5,
			winrate: 99,
		},
		{
			id:2,
			name: 'La menuiserie Seguin',
			difficulty: 'Difficile',
			cat: 'proba',
			riddles: 5,
			winrate: 45,
		},
		{
			id:3,
			name: 'La menuiserie Seguin',
			difficulty: 'Moyen',
			cat: 'proba',
			riddles: 5,
			winrate: 70,
		},
		{
			id:4,
			name: 'La menuiserie Seguin',
			difficulty: 'Facile',
			cat: 'proba',
			riddles: 5,
			winrate: 99,
		},

	]



	const handlePrecedent = () => {
		setStep(1);
	}

	const handleSuivant = (event) => {
		if (confirm("Les informations entrées sont exactes ?")) {
			setFormData(initialFormData)
			return;
		}
		event.preventDefault();
		//TODO: Creation de la game et get de l'id
	}

	return (
		<section className='flex flex-col h-full w-full p-10 gap-4'>
			<section>
				<h1 className='text-2xl pl-4'>Sélection des salles</h1>
			</section>

			<RoomNav/>
			<section className='w-full h-4/6'>
				{rooms.map((room, index) => {
					//TODO: Implementer le filtrage
					return(<Room key={room.id} name={room.name} difficulty={room.difficulty} riddles={room.riddles} winrate={room.winrate} id={room.id}/>);
				})}
			</section>

			<section className="flex flex-row justify-evenly items-end w-5/6">
				<button
					className='btn-cancel'
					type='submit'
					onClick={handlePrecedent}
				>
					Retour
				</button>
				<Link className='btn-validate' to='/pregame/AG874AJ' onClick={handleSuivant}>
					Suivant
				</Link>
			</section>

		</section>
	);
};


export default CreationGame2;