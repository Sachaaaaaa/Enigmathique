import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import logo from '../assets/img/logo-name-enigmathique.png';
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
		<nav className='nav-container'>
			<Link to='/'>
				<img src={logo} alt='logo'/>
			</Link>
			<section className='nav-content'>
				<ul className='w-full text-base'>
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



	return (
		<>
			{selected ? (
				<li className='nav-item-selected'>
					<div className='nav-item-indicator nav-item-indicator-selected'></div>
					<Link to={type[props.type].path} onClick={props.onClick} className='nav-menu-link'>
						<IconContext.Provider value={{className: 'text-inherit w-[25px] h-[25px] '}}>
							{type[props.type].icon}
						</IconContext.Provider>
						<button className='text-inherit h-20'>{type[props.type].name}</button>
					</Link>
				</li>
			) : (
				<li className='nav-item'>
					<div className='nav-item-indicator'></div>
					<Link to={type[props.type].path} onClick={props.onClick} className='h-[60px] w-full flex flex-row justify-start items-center gap-2'>
						<IconContext.Provider value={{className: 'text-inherit w-[25px] h-[25px]'}}>
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
	currentPath: PropTypes.string,
	onClick: PropTypes.func.isRequired,
};
export default SideBar;
