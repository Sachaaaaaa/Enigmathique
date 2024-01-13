

class RoomPlayable {
	constructor(name, enigmas) {
		this.name = name;
		this.enigmas = enigmas;
		this.enigmasSolved = [];
	}

	getEnigmasVariables = () => {
		return this.enigmas.map(enigma => enigma.variables);
	}

	checkAnswer = (enigmaId, answer) => {
		const enigma = this.enigmas[enigmaId];
		if (!enigma) {
			return false;
		}

		return enigma.answer == answer;
	}

	getEndMessage = (enigmaId) => {
		const enigma = this.enigmas[enigmaId];
		if (!enigma) {
			return null;
		}

		return enigma.endMessage;
	}
}

module.exports = RoomPlayable;