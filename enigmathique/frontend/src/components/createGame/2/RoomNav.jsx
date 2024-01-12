import React from "react";
import {useCreationGameContext} from "../../contexts/CreationGame.context";
import {FaSearch} from 'react-icons/fa';
import {IconContext} from 'react-icons';
import '../createGame.css'


const RoomNav = () => {

	const {filter, setFilter} = useCreationGameContext();

	const handleChangeType = (e) => {
		console.log(filter);
		setFilter({...filter, type: e.target.value});
	}
	const handleChangeText = (e) => {
		console.log(filter);
		setFilter({...filter, text: e.target.value})
	}
	return(
		<nav className='flex flex-row justify-end w-full pr-4 gap-12'>
			<section className='flex flex-row items-center justify-center bg-white rounded-full p-4 gap-2 shadow'>
				<IconContext.Provider value={{className: 'text-[#0a06f4]'}} >
					<FaSearch/>
				</IconContext.Provider>
				<input
					type='text'
					placeholder='Rechercher'
					onChange={handleChangeText}
					className="focus:border-transparent"
				/>
			</section>
			<section className="flex flex-row justify-center items-center">
				<label className={filter.type === 'suit'?'label-filter-selected':'label-filter'}>
					<input
						value='suit'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={filter.type === 'suit'}
						onChange={handleChangeType}
					/>
					Suites
				</label>
				<label className={filter.type === 'proba'?'label-filter-selected':'label-filter'}>
					<input
						value='proba'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={filter.type === 'proba'}
						onChange={handleChangeType}
					/>
					Probabilités
				</label>
				<label className={filter.type === 'fonct'?'label-filter-selected':'label-filter'}>
					<input
						value='fonct'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={filter.type === 'fonct'}
						onChange={handleChangeType}
					/>
					Fonctions
				</label>
				<label className={filter.type === 'ens'?'label-filter-selected':'label-filter'}>
					<input
						value='ens'
						type='radio'
						name='chapitre'
						className='hidden'
						checked={filter.type === 'ens'}
						onChange={handleChangeType}
					/>
					Ensembles
				</label>
			</section>
		</nav>
	);
}

export default RoomNav;