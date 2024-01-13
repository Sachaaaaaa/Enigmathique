import React, {useState} from 'react';
import {initialFilterData, initialFormData, useCreationGameContext} from '../../contexts/CreationGame.context';
import '../../../index.css';
import {Link} from 'react-router-dom';
import RoomNav from "./RoomNav";
import Room from "./Room";

const CreationGame2 = () => {

	const [selected, setSelected] = useState('suit');
	const {setStep, setFormData, filter, setFilter} = useCreationGameContext();

	const rooms = [
		{
			id:1,
			name: 'La chambre dorée',
			difficulty: 'Facile',
			cat: 'proba',
			riddles: 5,
			winrate: 99,
		},
		{
			id:2,
			name: 'La case de Pedro',
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
			name: 'La chaumiere d\'Antoine',
			difficulty: 'Facile',
			cat: 'fonct',
			riddles: 5,
			winrate: 99,
		},
		{
			id:5,
			name: 'La maison du pere Andre',
			difficulty: 'Facile',
			cat: 'ens',
			riddles: 5,
			winrate: 99,
		},
		{
			id:6,
			name: 'Le garage de Gerard',
			difficulty: 'Facile',
			cat: 'suit',
			riddles: 5,
			winrate: 99,
		},
		{
			id:7,
			name: 'La chambre dorée',
			difficulty: 'Facile',
			cat: 'proba',
			riddles: 5,
			winrate: 99,
		},
		{
			id:8,
			name: 'La chambre dorée',
			difficulty: 'Facile',
			cat: 'proba',
			riddles: 5,
			winrate: 99,
		},
		{
			id:9,
			name: 'La chambre dorée',
			difficulty: 'Facile',
			cat: 'proba',
			riddles: 5,
			winrate: 99,
		},
		{
			id:10,
			name: 'La chambre dorée',
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
			setFormData(initialFormData);
			setFilter(initialFilterData);
			return;
		}
		event.preventDefault();
		//TODO: Creation de la game et get de l'id
	}

	return (
		<section className='flex flex-col h-[96%] w-full gap-4'>
			<section className='h-[5%]'>
				<h1 className='text-2xl pl-4'>Sélection des salles</h1>
			</section>

			<RoomNav/>
			<section className='flex flex-col w-full h-[78%] overflow-y-scroll pr-4'>
				{rooms.map((room, index) => {
					return(
						room.cat === filter.cat && room.name.toLowerCase().includes(filter.text.toLowerCase()) &&
							<>
								<Room key={room.id} name={room.name} difficulty={room.difficulty} riddles={room.riddles} winrate={room.winrate} id={room.id}/>
								{index!==rooms.length-1 && <hr></hr>}
							</>
					);
				})}
			</section>

			<section className="flex flex-row justify-evenly items-end className='h-[10%]' w-full">
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
	)
};


export default CreationGame2;