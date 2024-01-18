import React from 'react';
import logo from '../assets/img/logo-name-enigmathique.png';
import {Link} from 'react-router-dom';


function NavBarHome() {
	const loginPath = './login';
	const registerPath = './signup'

	return (
		<header className='absolute w-full h-fit top-0 m-0 p-0 topbar-container border-none flex justify-end align-middle'>
		
			<div className='flex justify-around mr-5 gap-5 p-5'>
				<Link to={registerPath}>
					<button className="bg-white text-[#343C6A] font-semibold px-3 py-1 w-[180px] border-2 border-white rounded-[30px]">
					{`S'inscrire`}
					</button>
					{/* // hover:bg-white hover:primary-font-color */}
				</Link>
				<Link to={loginPath}>
					<button
						className='bg-transparent text-white font-semibold px-3 py-1 w-[180px] border-2 border-white rounded-[30px]'>
							Se connecter
							</button>
				</Link>
			</div>
		</header>
);
}

export default NavBarHome;