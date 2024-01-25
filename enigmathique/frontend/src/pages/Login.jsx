import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/auth.service';
import AuthHeader from 'components/AuthHeader';

import Textfield from 'components/authform/Textfield';
import Passwordfield from 'components/authform/Passwordfield'; 
import SubmitButton from 'components/authform/SubmitButton';
import {handleLoginError, styleEdit} from "../components/authform/handleError";
import Notification from "../components/Notification";
import toast from "react-hot-toast";

const Login = () => {
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);


	const [mailStyle, setMailStyle] = useState('');
	const [passwordStyle, setPasswordStyle] = useState('');

	const handleLogin = (e) => {
		// Empêcher le rechargement de la page
		e.preventDefault();
		// Réinitialiser le message d'erreur
		setMessage('');

		const formConplete = handleLoginError(mail, password);
		const {
			mailStyle,
			passwordStyle
		}= styleEdit('', '', mail, password);
		setMailStyle(mailStyle);
		setPasswordStyle(passwordStyle);

		// Envoie des données de connexion à l'API
		if (formConplete !== 1) {
			setLoading(true);
			console.log('nous y est');
			AuthService.login(mail, password).then(
				() => {
					// Redirection vers la page d'accueil
					window.location.href = '/dashboard';
				},
				(error) => {
					// Gestion des erreurs

					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();
					setLoading(false);
					toast.error(resMessage);
				}
			);
		}
	};


	return (
		// Ecran entier
		<div className='fullscreen-container overflow-y-auto'>
			<Notification></Notification>
			<AuthHeader title="Connexion"/>
			{/* Conteneur du formulaire (full width et centre le formulaire) */}
			<div className='form-container-style min-h-[350px]'>
					<form onSubmit={handleLogin} className='form-style' >
						<Textfield 
							label='Email'
							placeholder='Votre adresse mail'
							name='mail'
							value={mail}
							onChange={(e) => setMail(e.target.value)}
							style={mailStyle}
						/>
						<Passwordfield 
							label='Mot de passe'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							style={passwordStyle}
						/>
						<SubmitButton 
							text='Se connecter'
							loading={loading}
							onClick={handleLogin}
						/>

						<div className='text-auth-container-style '>
							<span> Pas encore de compte ?</span>
							<Link to='/signup' className='text-auth-style'>{"S'inscrire"} </Link>
						</div>

					</form>
				</div>
		</div>
	)
};

export default Login;
