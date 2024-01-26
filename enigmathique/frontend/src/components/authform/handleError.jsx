//vérification des champs
import toast from 'react-hot-toast';

/**
 * Vérifie si l'email à un format valide
 * @param email une chaine de caractère
 * @returns {boolean} true si l'email est valide, false sinon
 */
const isValidEmail = (email) => {
	// Expression RegEx pour vérifier le format de l'email
	const emailRegex = /^[^\s@]+@[^\s@]+\.(com|fr|net|org|edu|mil|int|co|io|app|blog|info|me|name|gov)$/;
	return emailRegex.test(email);
};
/**
 * Vérifie si le mot de passe à un format valide
 * @param password une chaine de caractère
 * @returns {boolean} true si le mot de passe est valide, false sinon
 */
const isValidPassword = (password) => {
	return password.length >= 8;
};
/**
 * changement du style des textFields conditionnellement
 * @param value une chaine de caractère
 * @returns {string} le style à appliquer
 */
const getFieldStyle = (value) => {
	return value ===''?'border-red-700':'border-green-700';
};
/**
 * changement du style des passwordFields conditionnellement
 * @param value une chaine de caractère
 * @returns {string} le style à appliquer
 */
const getPasswordStyle = (value) => {
	return isValidPassword(value)? 'border-green-600' : 'border-red-700';
};
/**
 * changement du style des mailFields conditionnellement
 * @param value une chaine de caractère
 * @returns {string} le style à appliquer
 */
const getMailStyle = (value) => {
	return isValidEmail(value) ? 'border-green-700' : 'border-red-700';
};


/**
 * application du style en fonction des champs
 * @param firstname le prénom dans le formulaire de l'inscription
 * @param lastname le nom dans le formulaire de l'inscription
 * @param mail l'email dans le formulaire de l'inscription
 * @param password le mot de passe dans le formulaire de l'inscription
 * @returns {{passwordStyle: string, firstnameStyle: string, lastnameStyle: string, mailStyle: string}} les sytles pour chaque champ
 */
const styleEdit = (firstname, lastname, mail, password) =>{
	return{
		firstnameStyle : getFieldStyle(firstname),
		lastnameStyle : getFieldStyle(lastname),
		mailStyle : getMailStyle(mail),
		passwordStyle : getPasswordStyle(password)
	};
};

/**
 * handler des erreurs pour le formulaire d'inscription
 * @param firstname le prénom dans le formulaire de l'inscription
 * @param lastname le nom dans le formulaire de l'inscription
 * @param mail l'email dans le formulaire de l'inscription
 * @param password le mot de passe dans le formulaire de l'inscription
 * @returns {number} 1 si il y a une erreur, 0 sinon
 */
const handleSignupError = (firstname, lastname, mail, password) => {
	let error = false;
	//vérifie si un des champs est vide
	if (firstname === '' || lastname === '' || mail === '' || password === '') {
		styleEdit(firstname, lastname, mail, password);
		error = true;
		//affiche le toast d'erreur
		toast.error('Veuillez remplir tous les champs');
		if (error) return 1;
	}
	//vérifie si le format de l'email est valide (regex)
	if (!isValidEmail(mail) && mail!=='') {
		styleEdit(firstname, lastname, mail, password);
		error = true;
		//affiche le toast d'erreur
		toast.error('Veuillez entrer une adresse email valide');
	}
	//vérifie si le mot de passe est valide (8 caractères minimum)
	if (!isValidPassword(password)  && password!=='') {
		styleEdit(firstname, lastname, mail, password);
		error = true;
		//affiche le toast d'erreur
		toast.error('Le mot de passe doit contenir au moins 8 caractères');
	}
	if (error) return 1;
};

/**
 * handler des erreurs pour le formulaire de connexion
 * @param mail l'email dans le formulaire de connexion
 * @param password le mot de passe dans le formulaire de connexion
 * @returns {number} 1 si il y a une erreur, 0 sinon
 */
const handleLoginError = (mail, password) => {
	let error = false;
	//vérifie si un des champs est vide
	if (mail === '' || password === '') {
		styleEdit('', '', mail, password);
		error = true;
		//affiche le toast d'erreur
		toast.error('Veuillez remplir tous les champs');
		if (error) return 1;
	}
	//vérifie si le format de l'email est valide (regex)
	if (!isValidEmail(mail) && mail!=='') {
		styleEdit('', '', mail, password);
	}
	//vérifie si le mot de passe est valide (8 caractères minimum)
	if (!isValidPassword(password)  && password!=='') {
		styleEdit('', '', mail, password);
	}
	if (error) return 1;
};
export {handleSignupError, handleLoginError, styleEdit}