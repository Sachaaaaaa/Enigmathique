const { parse, eval } = require('expression-eval');
const Room = require('./roomPlayable');

class RoomDefinition {
	constructor(roomJson) {
		this.name = roomJson.name;
		this.enigmas = roomJson.enigmas;
	}

	toRoom = (round) => {
		const enigmasValues = RoomDefinition.generateEnigmasValues(this.enigmas);

		return new Room(this.name, enigmasValues, round);
	}

	static generateEnigmasValues = (enigmas) => {
		const enigmasValues = [];

		enigmas.forEach(enigma => {
			const variables = RoomDefinition.generateVariables(enigma);
			const answer = RoomDefinition.generateAnswer(enigma, variables);

			enigmasValues.push({
				variables,
				answer,
				hint: enigma.hint,
				endMessage: enigma.endMessage,
			});
		});

		console.log(enigmasValues);

		return enigmasValues; 
	}

	// #region Génération variables

	static generateVariables = (enigma) => {
		const variables = {};

		for (const variableName in enigma.variables) {
			const variableData = enigma.variables[variableName];

			if (variableData.type === 'fixed') {
				variables[variableName] = variableData.value;
			} else if (variableData.type === 'generator') {
				variables[variableName] = Math.floor(Math.random() * (variableData.max - variableData.min + 1)) + variableData.min;
			}

		}

		return variables;
	}

	// #endregion

	// #region Génération réponses

	static generateAnswer = (enigma, variables) => {
		if (enigma.answer.type === 'fixed') {
			return enigma.answer.value;
		} else if (enigma.answer.type === 'dynamic') {
			return RoomDefinition.generateDynamicAnswer(enigma.answer, variables);
		}
	}

	static generateDynamicAnswer = (answer, variables) => {
		const expression = answer.expression;
		
		// Évalue l'expression
		// https://github.com/donmccurdy/expression-eval
		const ast = parse(expression);
		const value = eval(ast, variables);

		return value;
	}

	// #endregion


}

module.exports = RoomDefinition;