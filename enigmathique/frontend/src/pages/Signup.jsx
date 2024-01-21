import React from 'react';
import '../index.css';
import AuthHeader from 'components/AuthHeader';
import Textfield from 'components/authform/Textfield';
import Passwordfield from 'components/authform/Passwordfield'; 
import SubmitButton from 'components/authform/SubmitButton';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthService from '../services/auth.service';

function Signup() {

	const [firstname, setFirstname] = useState('');
	const [secondname, setSecondname] = useState('');
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const navigate = useNavigate();

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
				navigate('/dashboard');
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
		<div className='h-screen w-screen  bg-main-color '>
			<AuthHeader title="Inscription"/>
			<div className='form-container-style'>

					<form
						onSubmit={handleRegister}
						className='min-w-[450px] flex flex-col items-center justify-between bg-white primary-font-color shadow-md rounded p-8 pb-0'>
						<Textfield
							label='Prénom'
							placeholder='Votre prénom'
							name='firstname'
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
						/>
						<Textfield
							label='Nom'
							placeholder='Votre nom'
							name='secondname'
							value={secondname}
							onChange={(e) => setSecondname(e.target.value)}
						/>	
						<Textfield
							label='Email'
							placeholder='Jean@gmail.com'
							name='mail'
							value={mail}
							onChange={(e) => setMail(e.target.value)}
						/>
						<Passwordfield
							label='Mot de passe'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<SubmitButton 
							text='S’inscrire'
							loading={loading}
						/>
						{message && (
							<div className='text-red-500 text-xs mt-2'>{message}</div>
						)}
						<div className='pt-5 pb-2 w-fit text-sm primary-font-color'>
							<span> Vous avez déjà un compte ?</span>
							<Link to='/login' className='ml-1 font-medium blue-gradient-font-color decoration-[#0A06F4]  hover:underline'>Se connecter </Link>
						</div>
					</form>
					<div className='w-[450px] text-[13px] p-1 text-center primary-font-color'>
						<span>En {"t'inscrivant"}, tu acceptes nos </span> 
						<Link to='' className='font-medium underline'>Conditions générales</Link>
						<span>. Merci de lire notre </span>
						<Link to='' className='font-medium underline'>Politique de confidentialité</Link>
						<span> et notre </span>
						<Link to='' className='font-medium underline'>Politique de confidentialité des enfants</Link>
					</div>
				</div>
		</div>);
}


export default Signup;
