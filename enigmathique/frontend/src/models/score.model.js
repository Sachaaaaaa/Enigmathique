
class ScoreModel{
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