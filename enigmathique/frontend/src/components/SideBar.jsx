import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import logo from '../assets/img/logo-enigmathique.png';
import PropTypes from 'prop-types';
import {IconContext} from 'react-icons';
import {MdCollectionsBookmark, MdDoorFront, MdGames, MdHome} from 'react-icons/md';
import {useCreationGameContext, initialFormData, initialFilterData} from "./contexts/CreationGame.context";


const SideBar = () => {

	const location = useLocation();
	const path = location.pathname;
	const {setFormData, setFilterData} = useCreationGameContext();

	const handleNav = (event) => {
		if (path === "/create-game") {
			if (confirm("Etes-vous sûr de vouloir quitter la création de la partie ?")) {
				setFormData(initialFormData);
				setFilterData(initialFilterData);
				return;
			}
			event.preventDefault();
		}
	}

	return (
		<nav className='nav-container'>
			<Link to='/'>
				<img src={logo} alt='logo' className='w-40'/>
			</Link>
			<section className='nav-content'>
				<ul className='w-full text-xl'>
					<ItemList type='dashboard' onClick={handleNav} currentPath={path}/>
					<ItemList type='class' onClick={handleNav} currentPath={path}/>
					<ItemList type='games' onClick={handleNav} currentPath={path}/>
					<ItemList type='room' onClick={handleNav} currentPath={path}/>
				</ul>
				<Link to='/create-game'>
					<button className='btn-validate'>Nouvelle partie</button>
				</Link>
			</section>
		</nav>
	);
};

const ItemList = (props) => {
	const type = {
		dashboard: {
			name: 'Tableau de Bord',
			path: '/dashboard',
			icon: <MdHome/>,
		},
		class: {
			name: 'Mes classes',
			path: '/class',
			icon: <MdCollectionsBookmark/>,
		},
		games: {
			name: 'Mes parties',
			path: '/games',
			icon: <MdGames/>,
		},
		room: {
			name: 'Salles d\'énigmes',
			path: '/room',
			icon: <MdDoorFront/>,
		},
	}
	const selected = props.currentPath === type[props.type].path;


	return (
		<>
			{selected ? (
				<li className='nav-item-selected'>
					<div className='nav-item-indicator-selected'></div>
					<Link to={type[props.type].path} onClick={props.onClick} className='h-20 w-full flex flex-row justify-start items-center gap-4'>
						<IconContext.Provider value={{className: 'text-inherit h-10 w-10'}}>
							{type[props.type].icon}
						</IconContext.Provider>
						<button className='text-inherit h-20'>{type[props.type].name}</button>
					</Link>
				</li>
			) : (
				<li className='nav-item'>
					<div className='nav-item-indicator'></div>
					<Link to={type[props.type].path} onClick={props.onClick} className='h-20 w-full flex flex-row justify-start items-center gap-4'>
						<IconContext.Provider value={{className: 'text-inherit h-10 w-10'}}>
							{type[props.type].icon}
						</IconContext.Provider>
						<button className='text-inherit h-20'>{type[props.type].name}</button>
					</Link>
				</li>
			)}
		</>
	);
};


ItemList.propTypes = {
	type: PropTypes.string.isRequired,
	currentPath: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};
export default SideBar;
