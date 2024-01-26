import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import ClosePopup from '../informations/ClosePopup';

extend({ Html });

const ComputerConsoleEnigma = ({closeEnigma}) => {
	const [inputCommand, setInputCommand] = useState('');
	const [outputResponse, setOutputResponse] = useState('');

	const handleInputChange = (event) => {
		setInputCommand(event.target.value);
	};

	const handleExecuteCommand = (e) => {
		e.preventDefault();
		switch (inputCommand.toLowerCase()) {
		case 'ipconfig':
			setOutputResponse('Adresse de l\'ordinateur : 126.144.100.242');
			break;
		case 'info':
			setOutputResponse('Documentation du réacteur :\nPrototype du réacteur à énergie atomique A23, produit de l\'énergie a partir d\'atomes placer à l\'intérieur. Le réacteur a un diamétre de 80 dm, une cage en titane et une turbine.\nProcessus de démarrage du réacteur : \n1) Le réacteur a besoin d\'un atome spécifique pour fonctionner \n2) Pour le bon fonctionnement du reacteur, il faut le refroidir avec un fuide caloporteur comme H2O. Remplir le réacteur avec la formule indiquée. \n3) Ce même fluide caloporteur doit être a la température indiquée sur la courbe \n4) Avant de lancer le réacteur, il faut configurer l\'intensité du courant');
			break;
		case 'formule':
			setOutputResponse('Loi d\'Ohm : U = R * I \n U : Tension en Volt \n R : Résistance en Ohm \n I : Intensité en Ampère \nVolume sphère : 4/3 * Pi * R^3 \n Pi : 3.14 \n R : Rayon de la sphère \nVolume réacteur : Volume sphère / 3');	
			break;
		default:
			setOutputResponse("Commande invalide");
			break;
		}

		// Effacez la commande après l'exécution
		setInputCommand('');
	};

	return (
		// <Html>
		// 	<div className={`pop-up-container max-w-[500px]`}>
		// 		<div className='flex justify-between items-start w-full '>
		// 			<h1 className='pop-up-title p-3'>{"Console de l'ordinateur"} </h1>
		// 			<ClosePopup onClick={closeEnigma}></ClosePopup>
		// 		</div>

		// 		<div className='flex flex-col w-full p-3 pt-0 h-fit'>
		// 			<textarea
		// 					placeholder="Entrez une commande..."
		// 					maxLength={20}
		// 					value={inputCommand}
		// 					onChange={handleInputChange}
		// 					className="bg-black text-white border p-2 resize-none">	
		// 			</textarea>
		// 			<button onSubmit={handleExecuteCommand} className="bg-black-color text-white p-2">
		// 				Exécuter
		// 			</button>

		// 			<pre className="bg-black text-white border p-2 whitespace-pre-wrap h-[100px]">{outputResponse}</pre>
		// 		</div>

		// 	</div>

		// </Html>
		<Html>
			<div className={`pop-up-container w-[600px]`}>
				<div className='flex justify-between items-start w-full '>
					<h1 className='pop-up-title p-3'>{"Console de l'ordinateur"} </h1>
					<ClosePopup onClick={closeEnigma}></ClosePopup>
				</div>
					<input
						type ="text"
						placeholder="Tapez une commande..."
						value={inputCommand}
						onChange={handleInputChange}
						className="bg-black text-white border p-2 leading-snug focus:outline-none"
						maxLength={30}
					></input>
					<button onClick={(e) =>handleExecuteCommand(e)} className="bg-black-color text-white p-2">
						Exécuter
					</button>
				<div >
					<pre className="bg-black text-white border p-2 w-full whitespace-pre-wrap	">{outputResponse}</pre>
				</div>
			</div>
		</Html>
	);
};

export default ComputerConsoleEnigma;

ComputerConsoleEnigma.propTypes = {
	closeEnigma: PropTypes.func.isRequired,
};
