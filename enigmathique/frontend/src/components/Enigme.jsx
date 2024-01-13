// Une enigme a un *texte, un *champ de réponse, une image et un *bouton de validation, un *indice, un *bouton d'annulation.
// * = obligatoire

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { extend } from '@react-three/fiber';
import { Html } from '@react-three/drei';

// Étendez le composant Mesh pour inclure votre élément Enigme
extend({ Html });

const Enigme = (props) => {
	const [enigmeVisible, setEnigmeVisible] = useState(true);
	const [reponseUtilisateur, setReponseUtilisateur] = useState('');
	const [reponseCorrecte, setReponseCorrecte] = useState(false);
	const [afficherIndice, setAfficherIndice] = useState(false);

	const handleCancelClick = () => {
		// Mettez à jour l'état pour indiquer que l'énigme ne devrait plus être affichée
		setEnigmeVisible(false);
	};

	const handleInputChange = (e) => {
		// Mettez à jour l'état pour suivre la réponse saisie par l'utilisateur
		setReponseUtilisateur(e.target.value);
	};

	const handleCheckAnswer = () => {
		// Ajoutez ici la logique pour vérifier si la réponse est correcte (numérique)
		const reponseCorrecte = (parseFloat(reponseUtilisateur) === props.reponseEnigme);
		setReponseCorrecte(reponseCorrecte);
	};

	const handleShowHint = () => {
		// Mettez à jour l'état pour indiquer que l'indice doit être affiché
		setAfficherIndice(true);
	};


	// Si l'énigme n'est plus visible, ne rien rendre
	if (!enigmeVisible) {
		return null;
	}

	return (
		<Html>
			<div style={{
				position: 'absolute', transform: 'translate(-50%, 0%)',
				top: '50%', left: '50%',
				padding: '15px',
				background: 'white',
				borderRadius: '5px',
				display: 'flex',
				flexDirection: 'column', alignItems: 'center',
			}}>
				<h1>{props.titre}</h1>
				<p>{props.textEnigme}</p>
				{props.imageEnigme != null && <img src={`/models/models/${props.imageEnigme}.png`} alt="imageEnigme" />}
			
				{props.inputReponse === true &&
				<input
					type="text"
					value={reponseUtilisateur}
					onChange={handleInputChange}
					placeholder="Saisissez votre réponse"
					style={{ margin: '10px 0', padding: '5px' }}
				/>}

				{props.inputReponse === true &&
					<button onClick={handleCheckAnswer} style={{ margin: '5px 0' }}>
					Vérifier la réponse
					</button>
				}
				{reponseCorrecte === true && <p style={{ color: 'green' }} > {props.reponseV} </p>}
				{reponseCorrecte === false && <p style={{ color: 'red' }}> {props.reponseF} </p>}
				{reponseUtilisateur === null && <p style={{ color: 'red' }}> ---- </p>}

				{props.inputReponse === true && !afficherIndice && <button onClick={handleShowHint} style={{ margin: '10px 0' }}>
					Obtenir un indice
				</button>}
				{props.inputReponse === true && afficherIndice && <p>{props.indiceEnigme}</p>}

				<button onClick={handleCancelClick} style={{ marginTop: '10px' }}>
					Retour
				</button>
			</div>
		</Html>
	);
};

Enigme.propTypes = {
	titre: PropTypes.string.isRequired,
	textEnigme: PropTypes.string.isRequired,
	reponseF : PropTypes.string.isRequired,
	reponseV : PropTypes.string.isRequired,
	imageEnigme: PropTypes.string,
	reponseEnigme: PropTypes.number,
	indiceEnigme: PropTypes.string,
	inputReponse : PropTypes.bool,
	// Si on veux juste du texte ou une enigme avec tout se qui va avec (Champ réponse, indice ...)
	typeEnigme :  PropTypes.string,
};

export default Enigme;
