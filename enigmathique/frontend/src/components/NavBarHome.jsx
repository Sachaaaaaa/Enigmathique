import React from "react";
import logo from "../assets/img/logo-enigmathique.png";



function NavBarHome(){
	const loginPath = './login';
	const registerPath = './signup'

	return (<nav className="bg-blue-950 flex space-x-20 items-center">
		<div className="flex space-x-5">
			<img src={logo}  alt="logo" className="h-24"/>
			<div className="flex items-center">
				<h1 className="text-3xl text-white">Enigmathique</h1>
			</div>
		</div>
		<div className="flex space-x-10 justify-end mr-10">
			<a href={loginPath}>
				<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 w-32 rounded-lg">Login</button>
			</a>
			<a href={registerPath}>
				<button className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-3 px-4 w-32 border-2 border-white hover:border-transparent rounded-lg">Sign up</button>
			</a>
		</div>
	</nav>);
}
export default NavBarHome;