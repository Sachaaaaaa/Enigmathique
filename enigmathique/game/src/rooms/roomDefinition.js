const { parse, eval } = require('expression-eval');
const RoomPlayable = require('./roomPlayable');

/**
 * Représente une définition de salle
 * Une définition de salle est une salle qui n'est pas encore jouable par les équipes
 * Mais qui contient toutes les informations nécessaires pour la rendre jouable
 * Ex: les variables, les réponses, les indices, etc.
 * Elles sont nécessaires pour pouvoir créer des salles qui changent à chaque rotation
 * (Variables aléatoires, réponses en fonction de ces variables, etc.)
 * 
 * Ces salles sont définies dans un fichier .json
 * Elles sont ensuite converties en RoomPlayable et envoyées aux équipes
 */
class RoomDefinition {
	constructor(roomJson) {
		this.name = roomJson.name;
		this.enigmas = roomJson.enigmas;
	}

	/**
	 * 
	 * @param {RoomPlayable} round 
	 * @returns 
	 */
	toRoom = (round) => {
		// Génère les valeurs des variables et les réponses
		const enigmasValues = RoomDefinition.generateEnigmasValues(this.enigmas);
		return new RoomPlayable(this.name, enigmasValues, round);
	}

	/**
	 * Génère les valeurs des variables et les réponses
	 * @param {Array} définition des énigmes
	 * @returns {Array} valeurs des variables et réponses
	 */
	static generateEnigmasValues = (enigmas) => {
		const enigmasValues = [];

		// Créer les variables et les réponses pour chaque énigme puis les ajoute dans le tableau
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

		return enigmasValues; 
	}

	// #region Génération variables

	/**
	 * Génère les variables pour une énigme
	 * @param {Object} enigma 
	 * @returns {Object} variables 
	 */
	static generateVariables = (enigma) => {
		const variables = {};

		// Pour chaque variable, génère une valeur aléatoire entre min et max (inclus) 
		// si c'est un demandé (type: generator)
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

	/**
	 * Génère la réponse pour une énigme
	 * @param {Object} enigma
	 * @param {Object} variables
	 * @returns {String} réponse
	 */
	static generateAnswer = (enigma, variables) => {
		if (enigma.answer.type === 'fixed') {
			return enigma.answer.value;
		} else if (enigma.answer.type === 'dynamic') {
			return RoomDefinition.generateDynamicAnswer(enigma.answer, variables);
		}
	}

	/**
	 * Génère une réponse dynamique
	 * @param {Object} answer
	 * @param {Object} variables
	 * @returns {*} réponse
	 */
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