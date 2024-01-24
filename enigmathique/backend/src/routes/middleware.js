const jwt = require('jsonwebtoken');
require('dotenv').config();
const argon2 = require('argon2');
const db = require("../models/db.js");
const sha256 = require('js-sha256');
const TokenDB = db.token;

// Fonction qui à partir d'un token, détermine si il est valide ou non.
async function checkTokenValidity(token) {

    // Récupère le hash du token
    const tokenHash = sha256(token);

    try {
        // Essaye de trouver le n-uplet correspondant au hash du token
        const findedToken = await TokenDB.findOne({ where: { token: tokenHash } });
        // Si on trouve un n-uplet, cela signifie que le token n'a pas été révoqué par une deconnexion
        if (findedToken) {

            // Vérifie que le token n'est pas expiré
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

            // On renvoie l'ID contenu dans le token
            return decodedToken.id;
        }

        throw new Error("Token non valide");

    } catch (error) {
        // Si l'erreur est une erreur de token expiré, on supprime le token de la base de données
        if (error.name === 'TokenExpiredError') {
            await TokenDB.destroy({ where: { token: tokenHash } });
        }

        throw new Error("Token non valide");
    }
};

//  MiddleWare servant à la vérification du token avant chaque requête
exports.verifyToken = async(req, res, next) => {

    // Récupère le token dans le headers
    const token = req.headers['authorization'];

    try {

        // SI il n'y a pas de token, on renvoie une erreur
        if (!token) {
            throw new Error("Vous n'êtes pas connecté");
        }

        // Vérifie que le token est valide
        req.tokenId = await checkTokenValidity(token);
        next();

        // Gère les erreurs
    } catch (error) {
        return res.status(403).send({
            message: error.message || "Token non valide"
        });
    }
};

// MiddleWare servant à la gestion des erreurs
exports.verifyErrors = (err, req, res, next) => {
    if(!err.statusCode){
        return res.status(500).json({
            message: "Une erreur s'est produite"
        }); 
    }
    return res.status(err.statusCode).json({
        message: err.message
    });
}

// MiddleWare d'authentification spécifique à la backend du jeu
exports.verifyGameToken = async(req, res, next) => {

    // Récupère le token dans le headers
    const token = req.headers['authorization']
    
    // Si il y a un token de professeur
    if(req.body.tokenProf){
        
        req.tokenId = await checkTokenValidity(req.body.tokenProf);
        //const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
        //req.tokenId = decodedToken.id;

    }

    // Si pas de token on lève une erreur
    if (!token) {
        return res.status(403).json({
            message: "Vous n'êtes pas connecté"
        });
    }


    // Si le token n'est pas valide on lève une erreur
    if (token !== process.env.GAME_TOKEN) {
        return res.status(403).json({
            message: "Token de jeu invalide"
        });
    }

    next()
}


