import React from "react";
import '../../index.css';
import SearchInput from "../SearchInput";
import {useCreationGameContext} from "../contexts/CreationGame.context";

const GameNav = () => {
	const {filter, setFilter} = useCreationGameContext();
	const handleChangeText = (e) => {
		console.log(filter);
		setFilter({...filter, text: e.target.value})
	}
	return(
		<nav className='flex flex-row gap-10 justify-end w-full'>
			<SearchInput handleChangeText={handleChangeText}/>
			<button className='btn-validate'>
				Nouvelle partie
			</button>
		</nav>
	);
}
export default GameNav;