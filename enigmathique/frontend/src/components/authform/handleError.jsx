//vérification des champs
import toast from 'react-hot-toast';

/**
 * Fonctions utilitaires pour vérifier les champs du formulaire
 */
const isValidEmail = (email) => {
	// Expression RegEx pour vérifier le format de l'email
	const emailRegex = /^[^\s@]+@[^\s@]+\.(com|fr|net|org|edu|mil|int|co|io|app|blog|info|me|name|gov)$/;
	return emailRegex.test(email);
};
const isValidPassword = (password) => {
	return password.length >= 8;
};
const getFieldStyle = (value) => {
	return value ===''?'border-red-700':'border-green-700';
};
const getPasswordStyle = (value) => {
	return isValidPassword(value)? 'border-green-600' : 'border-red-700';
};
const getMailStyle = (value) => {
	return isValidEmail(value) ? 'border-green-700' : 'border-red-700';
};
//changement du style des champs

const styleEdit = (firstname, lastname, mail, password) =>{
	return{
		firstnameStyle : getFieldStyle(firstname),
		lastnameStyle : getFieldStyle(lastname),
		mailStyle : getMailStyle(mail),
		passwordStyle : getPasswordStyle(password)
	};
};

const handleSignupError = (firstname, lastname, mail, password) => {
	let error = false;
	if (firstname === '' || lastname === '' || mail === '' || password === '') {
		styleEdit(firstname, lastname, mail, password);
		error = true;
		toast.error('Veuillez remplir tous les champs');
		if (error) return 1;
	}
	if (!isValidEmail(mail) && mail!=='') {
		styleEdit(firstname, lastname, mail, password);
		error = true;
		toast.error('Veuillez entrer une adresse email valide');
	}
	if (!isValidPassword(password)  && password!=='') {
		styleEdit(firstname, lastname, mail, password);
		error = true;
		toast.error('Le mot de passe doit contenir au moins 8 caractères');
	}
	if (error) return 1;
};

const handleLoginError = (mail, password) => {
	let error = false;
	if (mail === '' || password === '') {
		styleEdit('', '', mail, password);
		error = true;
		toast.error('Veuillez remplir tous les champs');
		if (error) return 1;
	}
	if (!isValidEmail(mail) && mail!=='') {
		styleEdit('', '', mail, password);
	}
	if (!isValidPassword(password)  && password!=='') {
		styleEdit('', '', mail, password);
	}
	if (error) return 1;
};
export {handleSignupError, handleLoginError, styleEdit};