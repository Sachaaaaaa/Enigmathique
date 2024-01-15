
/**
 * Salle jouable
 * Créée à partir d'une RoomDefinition
 */
class RoomPlayable {
	constructor(name, enigmas, roundIndex) {
		this.name = name;
		this.enigmas = enigmas;
		this.roundIndex = roundIndex;

		this.enigmasSolved = [];
		this.enigmasHint = [];
		this.numBadAnswers = 0;
	}

	/**
	 * Permet de récupérer les variables des énigmes, utile pour les envoyer aux joueurs
	 * @returns {Array} Variables des énigmes
	 */
	getEnigmasVariables = () => {
		return this.enigmas.map(enigma => enigma.variables);
	}

	/**
	 * Vérifie la réponse d'une énigme
	 * Si la réponse est correcte, l'ajoute dans les énigmes résolues
	 * Si la réponse est incorrecte, incrémente le nombre de mauvaises réponses
	 * @param {int} enigmaId 
	 * @param {string} answer 
	 * @returns {bool} true si la réponse est correcte, false sinon
	 */
	checkAnswer = (enigmaId, answer) => {
		const enigma = this.enigmas[enigmaId];
		
		// Ne rien faire si l'énigme n'existe pas
		if (!enigma) {
			return false;
		}

		const isSolved = enigma.answer == answer;
		
		if (!isSolved) {
			this.numBadAnswers++;
		} else if(!this.enigmasSolved.includes(enigmaId)) { // Vérifie si l'énigme n'a pas déjà été résolue (pour éviter de compter plusieurs fois la même énigme)
			this.enigmasSolved.push(enigmaId);
		}

		return isSolved;
	}

	/**
	 * Récupère l'indice d'une énigme
	 * Si l'indice n'a pas déjà été récupéré, l'ajoute dans les indices récupérés
	 * @param {int} enigmaId 
	 * @returns {string} Indice de l'énigme
	 */
	getHint(enigmaId) {
		const enigma = this.enigmas[enigmaId];
		if (!enigma) {
			return null;
		}

		const hint = enigma.hint;
		if (hint && !this.enigmasHint.includes(enigmaId)) {
			this.enigmasHint.push(enigmaId);
		}

		return hint;
	}

	/**
	 * Récupère le message de fin d'une énigme
	 * @param {int} enigmaId
	 * @returns {string} Message de fin de l'énigme
	 */
	getEndMessage = (enigmaId) => {
		const enigma = this.enigmas[enigmaId];
		if (!enigma) {
			return null;
		}

		return enigma.endMessage;
	}

	/**
	 * 
	 * @returns {boolean} true si la salle est résolue, false sinon
	 */
	isRoomSolved = () => {
		return this.enigmasSolved.length == this.enigmas.length;
	}

	/**
	 * Retourne toutes les informations de la salle
	 * Utile pour envoyer les informations au professeur
	 * @returns {Object} Informations de la salle
	 */
	getData = () => {
		return {
			name: this.name,
			numSolved: this.enigmasSolved.length,
			numBadAnswers: this.numBadAnswers,
			numHints: this.enigmasHint.length,
			isSolved: this.isRoomSolved(),
		};
	}
}

module.exports = RoomPlayable;