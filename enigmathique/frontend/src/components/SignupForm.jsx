import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import AuthService from '../services/auth.service';

const SignupForm = () => {
	const [firstname, setFirstname] = useState('');
	const [secondname, setSecondname] = useState('');
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const handleRegister = (e) => {
		// Empêcher le rechargement de la page
		e.preventDefault();
		// Réinitialiser le message d'erreur
		setMessage('');
		setLoading(true);

		// Envoie des données de connexion à l'API
		AuthService.register(firstname, secondname, mail, password).then(
			() => {
				// Redirection vers la page d'accueil
				window.location.href = '/';
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
		<div className='form-container-style'>
			<div className='w-full max-w-md'>
				<form
					onSubmit={handleRegister}
					className='flex flex-col items-center justify-between bg-white primary-font-color shadow-md rounded p-8 pb-0'>
					<div className='mb-4 w-full'>
						<label
							className='form-label-style'
							htmlFor='username'>
							Prénom
						</label>
						<input
							type='text'
							id=''
							name='firstname'
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							placeholder='Votre prénom'
							className='form-inputfield-style'
							required/>
					</div>
					<div className='mb-4  w-full'>
						<label
							className='form-label-style'
							htmlFor='name'>
							Nom
						</label>
						<input
							type='text'
							id=''
							name='secondname'
							value={secondname}
							onChange={(e) => setSecondname(e.target.value)}
							placeholder='Votre nom'
							className='form-inputfield-style'
							required/>
					</div>
					<div className='mb-4  w-full'>
						<label
							className='form-label-style'
							htmlFor='name'>
							Email
						</label>
						<input
							type='email'
							id=''
							name='mail'
							value={mail}
							onChange={(e) => setMail(e.target.value)}
							placeholder='Jean@test.test'
							className='form-inputfield-style'
							required/>
					</div>

					<div className='mb-6  w-full'>
						<label
							className='form-label-style'
							htmlFor='password'>
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
							required/>
					</div>
						<button
							className='w-full bg-[#0A06F4] hover:bg-blue-700 text-white font-bold mt-2 py-2 rounded focus:outline-none'
							type='submit'
							disabled={loading}>
							{loading && (
								<span className='spinner-border spinner-border-sm'></span>
							)}
							<span>{"S'inscrire"}</span>
						</button>
					{message && (
						<div className='text-red-500 text-xs mt-2'>{message}</div>
					)}
					<div className='pt-5 pb-2 w-fit text-sm primary-font-color'>
						<span> Vous avez déjà un compte ?</span>
						<Link to='/login' className='ml-1 font-medium gradient-font decoration-[#0A06F4]  hover:underline'>Se connecter </Link>
					</div>
				</form>
				<div className='w-fit text-[13px] p-1 text-center primary-font-color'>
					<span>En {"t'inscrivant"}, tu acceptes nos </span> 
					<Link to='' className='font-medium underline'>Conditions générales</Link>
					<span>. Merci de lire notre </span>
					<Link to='' className='font-medium underline'>Politique de confidentialité</Link>
					<span> et notre </span>
					<Link to='' className='font-medium underline'>Politique de confidentialité des enfants</Link>
				</div>
			</div>
		</div>
	);
}

export default SignupForm;
