import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Bar de navigation de la page principale
 * @returns {Element}
 * @constructor
 */
function NavBarHome() {
	const loginPath = './login';
	const registerPath = './signup'

	return (
		// En-tête de la page d'accueil
		<header className='topbar-container absolute top-0 z-10 justify-end align-middle w-full h-fit m-0 p-0 border-none '>
			{/* Boutons d'authentification*/}
			<div className='flex gap-5 p-5'>
				<Link to={registerPath}>
					<button className="home-auth-button bg-white primary-font-color">
					{`S'inscrire`}
					</button>
					{/* // hover:bg-white hover:primary-font-color */}
				</Link>
				<Link to={loginPath}>
					<button
						className='home-auth-button bg-transparent text-white'>
							Se connecter
							</button>
				</Link>
			</div>
		</header>
);
}

export default NavBarHome;