
class ScoreModel{
	/**
	 * Constructeur du score. Un score chiffré est calculé à partir des données contenues dans les objets
	 * @param idTeam identifiant de l'équipe correspondant au score
	 * @param roomName nom de la salle correspondant au score
	 * @param idGame identifiant de la partie correspondant au score
	 * @param time temps de réalisation de la salle
	 * @param nbGoodAnswers nombre de bonne réponse dans la salle
	 * @param nbBadAnswers nombre de mauvaises réponses dans la salle
	 * @param nbHints nombre d'indice utilisé dans la salle
	 * @param createdAt date de création du score
	 * @param updatedAt date de dernière mise à jour du score
	 * @param isSolved salle terminée
	 */
	constructor(idTeam, roomName, idGame, time, isSolved, nbGoodAnswers, nbBadAnswers, nbHints, createdAt, updatedAt) {
		this.idTeam = idTeam;
		this.roomName = roomName;
		this.idGame = idGame;
		this.time = time;
		this.isSolved = isSolved
		this.nbGoodAnswers = nbGoodAnswers;
		this.nbBadAnswers = nbBadAnswers;
		this.nbHints = nbHints;
		this.createdAt = new Date (createdAt);
		this.updatedAt = new Date(updatedAt);
	}

}
export default ScoreModel;