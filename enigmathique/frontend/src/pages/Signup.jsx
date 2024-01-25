import React from 'react';
import '../index.css';
import AuthHeader from 'components/AuthHeader';
import Textfield from 'components/authform/Textfield';
import Passwordfield from 'components/authform/Passwordfield';
import SubmitButton from 'components/authform/SubmitButton';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import AuthService from '../services/auth.service';
import toast from "react-hot-toast";
import Notification from "../components/Notification";
import {handleSignupError,	styleEdit} from "../components/authform/handleError";

function Signup() {
	
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [mail, setMail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const navigate = useNavigate();

	const [firstnameStyle, setFirstnameStyle] = useState('');
	const [lastnameStyle, setLastnameStyle] = useState('');
	const [mailStyle, setMailStyle] = useState('');
	const [passwordStyle, setPasswordStyle] = useState('');
	const handleRegister = (e) => {
		// Empêcher le rechargement de la page
		e.preventDefault();
		// Réinitialiser le message d'erreur
		setMessage('');

		
		const formComplete = handleSignupError(firstname, lastname, mail, password);
		const {
			firstnameStyle,
			lastnameStyle,
			mailStyle,
			passwordStyle
		}= styleEdit(firstname, lastname, mail, password)
		setFirstnameStyle(firstnameStyle);
		setLastnameStyle(lastnameStyle);
		setMailStyle(mailStyle);
		setPasswordStyle(passwordStyle);
		
		if (formComplete !== 1) {
			setLoading(true);
			// Envoie des données de connexion à l'API
			AuthService.register(firstname, lastname, mail, password).then(
				() => {
					// Redirection vers la page d'accueil
					navigate('/dashboard');
				},
				(error) => {
					//gestion des erreurs
					const resMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString();
					setLoading(false);
					toast.error(resMessage);
				});
		}
	};
	
	return (
		// Ecran entier
		<div className='fullscreen-container overflow-y-auto'>
			<Notification></Notification>
			<AuthHeader title="Inscription"/>
			{/* Conteneur du formulaire (full width et centre le formulaire) */}
			<div className='form-container-style min-h-[550px]'>
				<form onSubmit={handleRegister} className='form-style'>
					<Textfield
						label='Prénom'
						placeholder='Votre prénom'
						name='firstname'
						value={firstname}
						onChange={(e) => setFirstname(e.target.value)}
						style={firstnameStyle}
					/>
					<Textfield
						label='Nom'
						placeholder='Votre nom'
						name='lastname'
						value={lastname}
						onChange={(e) => setLastname(e.target.value)}
						style={lastnameStyle}
					/>
					<Textfield
						label='Email'
						placeholder='Jean@gmail.com'
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
						text='S’inscrire'
						loading={loading}
						onClick={handleRegister}
					/>
					
					<div className='text-auth-container-style'>
						<span> Vous avez déjà un compte ?</span>
						<Link to='/login' className='text-auth-style'>Se connecter </Link>
					</div>
				</form>
				
				{/* Conditions d'inscription */}
				<div className='w-[450px] text-[13px] p-1 text-center primary-font-color'>
					<span>En {`t'inscrivant`}, tu acceptes nos </span>
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
