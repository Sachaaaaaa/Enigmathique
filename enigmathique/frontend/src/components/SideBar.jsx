import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo-enigmathique.png";
import PropTypes from "prop-types";

const ItemList = (props) => {
	return (
		<li className="hover:bg-red-800">
			<Link to={props.path} className="h-20">
				<button className="w-full text-white h-20">{props.name}</button>
			</Link>
		</li>
	);
};

const SideBar = () => {

	return (
		<nav className="w-40 bg-blue-950 h-screen">
			<Link to="..">
				<img src={logo} alt="logo" className="items-center"/>
			</Link>
			<ul>
				<ItemList name="Tableau de Bord" path="*"/>
				<ItemList name="Créer une Partie" path="*"/>
				<ItemList name="Créer une Classe" path="*"/>
				<ItemList name="Voir les Salles" path="*"/>
			</ul>
			<Link to="../test">
				<button className="bg-blue-300 hover:bg-amber-200 w-full h-20">Nouvelle partie</button>
			</Link>
		</nav>
	);
};


ItemList.propTypes = {
	name: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
};
export default SideBar;
