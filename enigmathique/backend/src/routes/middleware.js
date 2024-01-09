const jwt = require('jsonwebtoken');
const secretKey = 'bloubiboulba';

exports.verifyToken = (req, res, next) => {

    const token = req.headers['authorization']

    // Si il n'y a pas de token, indique à l'utilisateur qu'on est pas connecté
    if(!token){
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



// 	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsYXN0bmFtZSI6ImxvdWlzIiwiZmlyc3RuYW1lIjoiamVhbiIsIm1haWwiOiJqZWFhYWFuYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRLbHZ1V0xWRWR0b01zbGJwdW1MTzQub1ZnTkh6cFlKWEV3aGhKbUNSMFJOeGdDYlpmUzVILiIsImlhdCI6MTcwNDc4NjAxOSwiZXhwIjoxNzA0Nzg5NjE5fQ.08vZdB0yKxcHwZMrPa7hJmZl80q0mQ_76W-9NP0zYRs
