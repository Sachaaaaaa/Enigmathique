const jwt = require('jsonwebtoken');
const secretKey = 'bloubiboulba';

exports.verifyToken = (req, res, next) => {

    const token = req.headers['authorization']

    // Si il n'y a pas de token, indique à l'utilisateur qu'on est pas connecté
    if (!token) {
        res.status(403).send({
            message: "Vous n'êtes pas connecté"
        });
        return;
    }


    // Vérifie la validité du token, si il l'est on accède a la ressource demandé, sinon on retourne une erreur 403
    try {
        const decodedToken = jwt.verify(token, secretKey)
        req.tokenId = decodedToken.id;
        next()
    } catch (error) {
        res.status(403).send({
            message: "Token non valide"
        });
        return;
    }
}

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

exports.verifyGameToken = (req, res, next) => {
    const token = req.headers['authorization']
    
    if(req.body.tokenProf){
        const token = req.body.tokenProf
        const decodedToken = jwt.verify(token, secretKey)
        req.tokenId = decodedToken.id;
    }

    if (!token) {
        return res.status(403).json({
            message: "Vous n'êtes pas connecté"
        });
    }

    // Compare avec process.env.GAME_TOKEN
    if (token !== process.env.GAME_TOKEN) {
        return res.status(403).json({
            message: "Token de jeu invalide"
        });
    }

    next()
}


