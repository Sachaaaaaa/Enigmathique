import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import logo from '../assets/img/logo-enigmathique.png';
import PropTypes from 'prop-types';
import {IconContext} from 'react-icons';
import {MdCollectionsBookmark, MdDoorFront, MdGames, MdHome} from 'react-icons/md';


const SideBar = () => {

	const location = useLocation();
	const path = location.pathname;

	return (
		<nav className='nav-container'>
			<Link to='/'>
				<img src={logo} alt='logo' className='w-40'/>
			</Link>
			<section className='nav-content'>
				<ul className='w-full text-xl'>
					<ItemList type='dashboard' currentPath={path}/>
					<ItemList type='class' currentPath={path}/>
					<ItemList type='game' currentPath={path}/>
					<ItemList type='room' currentPath={path}/>
				</ul>
				<Link to='/creationgame'>
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
		game: {
			name: 'Mes parties',
			path: '/game',
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
					<Link to={type[props.type].path} className='h-20 w-full flex flex-row justify-start items-center gap-4'>
						<IconContext.Provider value={{className: 'text-inherit h-10 w-10'}}>
							{type[props.type].icon}
						</IconContext.Provider>
						<button className='text-inherit h-20'>{type[props.type].name}</button>
					</Link>
				</li>
			) : (
				<li className='nav-item'>
					<div className='nav-item-indicator'></div>
					<Link to={type[props.type].path} className='h-20 w-full flex flex-row justify-start items-center gap-4'>
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
};
export default SideBar;
