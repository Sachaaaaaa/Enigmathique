import React from 'react';
import './index.css'; // le style de l'application
import SectionTitle from './components/sectionTitle'; // le composant SectionTitle
import { useState, useEffect} from 'react'; // les hooks




const App = () => {
	const title = 'React with Webpack and Babel';
    
	const users = [
		{ id: 1, name: 'Robin' },
		{ id: 2, name: 'Dennis' },
		{ id: 3, name: 'Sara' },
		{ id: 4, name: 'John' },
		{ id: 5, name: 'Jack' },
		{ id: 6, name: 'Joe' },
		{ id: 7, name: 'Jane' },
		{ id: 8, name: 'Sally' },
		{ id: 9, name: 'Marry' },
		{ id: 10, name: 'Albert' }
	];

	const handleDisplayEventAlert = (event) => {
		alert(`A ${event.type} event has been triggered!`);
	};

	// useState pour définir et gérer l'état 'count'.
	// 'count' est initialisé à 0. 'setCount' est la fonction pour mettre à jour 'count'.
	const [count, setCount] = useState(0);

	// useState pour définir et gérer l'état 'currentTime'.
	// 'currentTime' est initialisé à l'heure actuelle. 'setCurrentTime' est la fonction pour mettre à jour 'currentTime'.
	const [currentTime, setCurrentTime] = useState(new Date());

	// useEffect s'exécute après chaque rendu (équivalent à componentDidMount et componentDidUpdate dans un composant de classe).
	// Il n'a pas de dépendances (tableau vide), donc il s'exécute une seule fois après le premier rendu du composant.
	useEffect(() => {
		// Crée un intervalle qui met à jour 'currentTime' chaque seconde.
		const timerId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		// Fonction de nettoyage : sera exécutée avant que le composant soit retiré du DOM ou avant que l'effet soit réappliqué.
		// Ici, elle efface l'intervalle créé précédemment pour éviter les fuites de mémoire.
		return () => clearInterval(timerId);
	}, []); // Le tableau vide indique que cet effet n'a pas de dépendances et ne doit s'exécuter qu'une fois.

	// Fonction pour gérer les clics sur les noms d'utilisateurs.
	const handleDisplayUsernameInAlert = (username) => {
		alert(`Hello ${username}!`);
	};

	// Fonction pour gérer les clics sur le bouton d'incrémentation.
	// À chaque clic, elle met à jour l'état 'count' en ajoutant 1 à la valeur actuelle.
	const handleIncrement = () => {
		setCount(count + 1);
	};

	// Rendu du composant.
	return (
		<div className="container mx-auto px-4">
			<h1 className="text-3xl font-bold text-gray-800 my-5">{title}</h1>
			<SectionTitle content="Counter"/>
			<p className="my-2">Count: {count}</p>
			<button 
				className="text-white py-2 px-4 rounded hover:bg-white hover:text-purple-600 transition duration-300 bg-gray-200"
				onClick={handleIncrement}
			>
                Increment
			</button>

			<SectionTitle content="Clock"/>
			<p className="my-2">Today: {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}</p>
			<button 
				className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-white hover:text-purple-600 transition duration-300 my-4"
				onClick={handleDisplayEventAlert}
			>
                Click here
			</button>
			<p className="my-2">Lorem ipsum dolor sit amet consectetur adipi sicing elit.</p>

			<SectionTitle content="Users"/>
			<ul className="list-none my-4">
				{users.map(user => (
					<li 
						key={user.id} 
						onClick={() => handleDisplayUsernameInAlert(user.name)}
						className="bg-gray-200 my-2 py-2 rounded hover:bg-gray-300 transition duration-300"
					>
						{user.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;