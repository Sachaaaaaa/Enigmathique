import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/auth.service';
import AuthHeader from 'components/AuthHeader';


const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

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
		<div className='h-screen w-screen'>
			<AuthHeader title="Connexion"/>
			<div className='form-container-style'>
				<div className='w-full max-w-md'>
					<form
						onSubmit={handleLogin}
						className='flex flex-col items-center justify-between bg-white primary-font-color shadow-md rounded p-8 pb-0 mb-4'
					>
						<div className='mb-4 w-full'>
							<label
								className='form-label-style'
								htmlFor='username'>
								Email
							</label>
							<input
								type='text'
								id='username'
								name='username'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								placeholder='Votre adresse mail'
								className='form-inputfield-style'
								required
							/>
						</div>
						<div className='mb-4  w-full'>
							<label
								className='form-label-style'
								htmlFor='password'
							>
								Mot de passe
							</label>
							<input
								type='password'
								id='password'
								name='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder='Votre mot de passe'
								className='form-inputfield-style'
								required
							/>
						</div>
							<button
								className='w-full bg-[#0A06F4] hover:bg-blue-700 text-white font-bold mt-2 py-2 rounded focus:outline-none'
								type='submit'
								disabled={loading}
							>
								{loading && (
									<span className='spinner-border spinner-border-sm'></span>
								)}
								<span>Login</span>
							</button>
						{message && (
							<div className='text-red-500 text-xs mt-2'>{message}</div>
						)}
						<div className='pt-5 pb-2 w-fit text-sm primary-font-color'>
							<span> Pas encore de compte ?</span>
							<Link to='/signup' className='ml-1 font-medium gradient-font decoration-[#0A06F4]  hover:underline'>{"S'inscrire"} </Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
};

export default Login;
