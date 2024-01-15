

class RoomPlayable {
	constructor(name, enigmas, roundIndex) {
		this.name = name;
		this.enigmas = enigmas;
		this.roundIndex = roundIndex;

		this.enigmasSolved = [];
		this.numHints = 0;
		this.numBadAnswers = 0;
	}

	getEnigmasVariables = () => {
		return this.enigmas.map(enigma => enigma.variables);
	}

	checkAnswer = (enigmaId, answer) => {
		const enigma = this.enigmas[enigmaId];
		
		if (!enigma) {
			return false;
		}

		const isSolved = enigma.answer == answer;
		if (!isSolved) {
			this.numBadAnswers++;
		} else {
			this.enigmasSolved.push(enigmaId);
		}

		return isSolved;
	}

	getEndMessage = (enigmaId) => {
		const enigma = this.enigmas[enigmaId];
		if (!enigma) {
			return null;
		}

		return enigma.endMessage;
	}

	getResult = () => {
		return {
			name: this.name,
			enigmas: this.enigmasSolved
		};
	}

	isRoomSolved = () => {
		return this.enigmasSolved.length == this.enigmas.length;
	}

	// Retourne toutes les infos => sera envoyé au professeur
	getData = () => {
		return {
			name: this.name,
			numSolved: this.enigmasSolved.length,
			numBadAnswers: this.numBadAnswers,
			numHints: this.numHints,
			isSolved: this.isRoomSolved(),
		};
	}
}

module.exports = RoomPlayable;