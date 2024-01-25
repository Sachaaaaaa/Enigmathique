// Ajout du token dans le header de la requête

const authHeader = () => {
	const user = JSON.parse(sessionStorage.getItem('user'));

	if (user && user.token) {
		return {'Authorization': user.token};
	}
	return {};
};

export default authHeader;