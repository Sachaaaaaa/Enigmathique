import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import logo from 'assets/img/logo-name-enigmathique-black.png';
import PropTypes from 'prop-types';
import {IconContext} from 'react-icons';
import {MdCollectionsBookmark, MdDoorFront, MdGames, MdHome} from 'react-icons/md';
import {useState} from 'react';
import Modal, {ModalBody, ModalHeader} from './Modal';
import {useNavigate} from 'react-router-dom';

/**
 * Définit la side bar sur le côté professeur
 * @returns {Element}
 * @constructor
 */
const SideBar = () => {

	const [cancelModalOpen, setCancelModalOpen] = useState(false);
	const [cancelNavPath, setCancelNavPath] = useState("dashboard");
	const location = useLocation();
	const path = location.pathname;


	const handleNav = (event,navPath) => {
		if (path === "/create-game") {
			setCancelNavPath(navPath);
			setCancelModalOpen(true);
			event.preventDefault();
		}
	}

	const navigate = useNavigate();
	const handleRedirection = () => {
		setCancelModalOpen(false);	
		navigate("/" + cancelNavPath);
	}

	return (
		<nav id="sidebar">
			<Link to='/dashboard' className='w-[170px] mt-7 mb-5'>
				<img src={logo} alt='logo'/>
			</Link>
			<section className='flex flex-col justify-between items-center w-full h-full py-5 pr-2 whitespace-nowrap;'>
				<ul className='w-full text-base'>
					<ItemList type='dashboard' onClick={(e) => handleNav(e,"dashboard")} currentPath={path}/>
					<ItemList type='class' onClick={(e) => handleNav(e,"class")} currentPath={path}/>
					<ItemList type='games' onClick={(e) => handleNav(e,"games")} currentPath={path}/>
					<ItemList type='room' onClick={(e) => handleNav(e,"rooms")} currentPath={path}/>
				</ul>
				<Link to='/create-game' className='flex justify-center items-center w-full'>
					<button className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style w-[80%] whitespace-nowrap p-8'>Nouvelle partie</button>
				</Link>
			</section>
			{cancelModalOpen && (
				<Modal>
                <ModalHeader title="Retour au menu"/>
                <ModalBody>
                    <form className='flex flex-col text-center w-full gap-3'>
                        <p className=' block text-sm font-medium mb-5 primary-font-color'>Êtes-vous sûr de vouloir retourner au menu ?</p>
                        <button
                            type='submit'
                            className='bg-gradient-to-r from-[#4C49ED] to-[#0A06F4] modal-validate-button-style'
                            onClick={handleRedirection}>
                            Oui
                        </button>
                        <button
                            className='modal-cancel-button-style'
                            onClick={() => setCancelModalOpen(false)}>
                            Annuler
                        </button>
                    </form>
                </ModalBody>
            </Modal>)}
		</nav>
	);
};

/**
 * Définit les sections de la side bar
 * @param props
 * @returns {Element}
 * @constructor
 */
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
