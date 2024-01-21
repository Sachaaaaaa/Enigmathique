import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/auth.service';
import AuthHeader from 'components/AuthHeader';

import Textfield from 'components/authform/Textfield';
import Passwordfield from 'components/authform/Passwordfield'; 
import SubmitButton from 'components/authform/SubmitButton';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = (e) => {
		// Empêcher le rechargement de la page
		e.preventDefault();
		// Réinitialiser le message d'erreur
		setMessage('');
		setLoading(true);

		// Envoie des données de connexion à l'API
		AuthService.login(username, password).then(
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
				setMessage(resMessage);
			}
		);
	};


	return (
		<div className='h-screen w-screen bg-main-color '>
			<AuthHeader title="Connexion"/>
			<div className='form-container-style'>
				<div className='w-full max-w-md'>
					<form
						onSubmit={handleLogin}
						className='min-w-[450px] flex flex-col items-center justify-between bg-white primary-font-color shadow-md rounded p-8 pb-0'
					>
						<Textfield 
							label='Email'
							placeholder='Votre adresse mail'
							name='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Passwordfield 
							label='Mot de passe'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<SubmitButton 
							text='Se connecter'
							loading={loading}
						/>
						{message && (
							<div className='text-red-500 text-xs mt-2'>{message}</div>
						)}
						<div className='pt-5 pb-2 w-fit text-sm primary-font-color'>
							<span> Pas encore de compte ?</span>
							<Link to='/signup' className='ml-1 font-medium blue-gradient-font-color decoration-[#0A06F4]  hover:underline'>{"S'inscrire"} </Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
};

export default Login;
