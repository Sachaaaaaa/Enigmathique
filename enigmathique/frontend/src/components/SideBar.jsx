import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import logo from '../assets/img/logo-name-enigmathique-black.png';
import PropTypes from 'prop-types';
import {IconContext} from 'react-icons';
import {MdCollectionsBookmark, MdDoorFront, MdGames, MdHome} from 'react-icons/md';


const SideBar = () => {

	// const location = useLocation();
	// const path = location.pathname;
	// const {setFormData} = useCreationGameContext();
	const path='';

	const handleNav = (event) => {
		if (path === "/create-game") {
			if (confirm("Etes-vous sûr de vouloir quitter la création de la partie ?")) {
				// setFormData(initialFormData);

				return;
			}
			event.preventDefault();
		}
	}

	return (
		<nav className='flex flex-col items-center w-1/6 min-w-min h-full border-r-2 border-white-color box-border'>
			<Link to='/dashboard' className='w-[172px] mt-7 mb-5'>
				<img src={logo} alt='logo'/>
			</Link>
			<section className='flex flex-col justify-between items-center w-full h-full py-5 pr-2 whitespace-nowrap;'>
				<ul className='w-full text-base'>
					<ItemList type='dashboard' onClick={handleNav} currentPath={path}/>
					<ItemList type='class' onClick={handleNav} currentPath={path}/>
					<ItemList type='games' onClick={handleNav} currentPath={path}/>
					<ItemList type='room' onClick={handleNav} currentPath={path}/>
				</ul>
				<Link to='/create-game' className='flex justify-center items-center w-full'>
					<button className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style w-[80%] whitespace-nowrap p-8'>Nouvelle partie</button>
				</Link>
			</section>
		</nav>
	);
};

const ItemList = (props) => {
	const location = useLocation();
	const path = location.pathname.toLowerCase();
	const type = {
		dashboard: {
			name: 'Tableau de bord',
			path: '/dashboard',
			icon: <MdHome/>,
		},
		class: {
			name: 'Mes classes',
			path: '/class',
			subdomains: [''],
			icon: <MdCollectionsBookmark/>,
		},
		games: {
			name: 'Mes parties',
			path: '/games',
			icon: <MdGames/>,
		},
		room: {
			name: 'Salles d\'énigmes',
			path: '/rooms',
			icon: <MdDoorFront/>,
		},
	}
	//TODO: Surveiller si ca marche avec toutes les pages
	const selected = path.includes(type[props.type].path);

	const liClassName = selected ? 'nav-item-selected' : 'nav-item' ;
	const divClassName = selected ? 'nav-item-indicator-selected' : 'nav-item-indicator';

	return (
		<>
		{/* Si l'élément est sélectionné, on ajoute -selected à la classe des balises <li> et <div> pour changer le style */}
		<li className={liClassName}> 
		
			{/* Indicateur de sélection */}
			<div className={divClassName}></div>

			{/* Lien vers la page correspondante */}
			<Link to={type[props.type].path} onClick={props.onClick} className='nav-menu-link'>
				<IconContext.Provider value={{className: 'text-inherit w-[25px] h-[25px] '}}>
					{type[props.type].icon}
				</IconContext.Provider>
				<button className='text-inherit h-20'>{type[props.type].name}</button>
			</Link>
		</li>
		</>
	);
};
ItemList.propTypes = {
	type: PropTypes.string.isRequired,
	currentPath: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};
export default SideBar;
