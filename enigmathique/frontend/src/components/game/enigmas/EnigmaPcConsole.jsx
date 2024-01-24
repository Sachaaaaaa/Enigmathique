import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { IoIosCloseCircle } from 'react-icons/io';

extend({ Html });

const ComputerConsoleEnigma = (closePopup) => {
	const [inputCommand, setInputCommand] = useState('');
	const [outputResponse, setOutputResponse] = useState('');

	const handleInputChange = (event) => {
		setInputCommand(event.target.value);
	};

	const handleExecuteCommand = () => {
		switch (inputCommand.toLowerCase()) {
		case 'ipconfig':
			setOutputResponse('Adresse de l\'ordinateur : 126.144.100.242');
			break;
		case 'info':
			setOutputResponse('Documentation du Reacteur : \n Prototype du réacteur atomique A23, produit de l\'énergie a partir d\'atome placer a l\'intérieur. Le réacteur a un diamétre de 80 dm, une cage en titane et une turbine \n 1) Le reacteur a besoin d\'un atome spécifique pour fonctionner \n 2) Pour le bon fonction du reacteur, il faut le refroidir avec un fuide caloporteur comme H2O \n 3) Ce meme fluide caloporteur doit être a la température indiqué sur la courbe \n 4) Avant de lancé le réacteur, il faut configurer l\'intensité du courant');
			break;
		case 'formule':
			setOutputResponse('Loi d\'Ohm : U = R * I \n U : Tension en Volt \n R : Résistance en Ohm \n I : Intensité en Ampère \n Volume sphère : 4/3 * Pi * R^3 \n Pi : 3.14 \n R : Rayon de la sphère \n Volume réacteur : Volume sphère / 3');	
			break;
		default:
			setOutputResponse("Rentrer une commande valide");
			break;
		}

		// Effacez la commande après l'exécution
		setInputCommand('');
	};

	return (
		<Html>
			<div className="absolute translate-y-[-70%] top-0 left-1/2 p-4 bg-white rounded-md flex flex-col items-center w-96">
				<h1>Console d&apos;ordinateur</h1>
				<div>
					<textarea
						placeholder="Tapez une commande..."
						value={inputCommand}
						onChange={handleInputChange}
						className="border p-2"
					></textarea>
					<button onClick={handleExecuteCommand} className="bg-blue-500 text-white p-2 ml-2 rounded">
						Exécuter
					</button>
				</div>
				<div className="mt-4">
					<p>Réponse :</p>
					<p className="border p-2">{outputResponse}</p>
				</div>
			</div>
		</Html>
	);
};

export default ComputerConsoleEnigma;

ComputerConsoleEnigma.propTypes = {
	closePopup: PropTypes.func.isRequired,
};
