/*
  ================================
   Test des routes /api/game
  ================================
*/

const request = require('supertest');
const app = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur

let token;
let professorId;
let courseId;
let gameId;

describe('Test des routes /api/game', () => {
    beforeAll(async () => {
        // Création d'un professeur et d'une classe pour les tests
        const profData = { lastname: 'Test', firstname: 'Prof', mail: 'testprof@example.com', password: 'password' };
        const profResponse = await request(app).post('/api/auth/register').send(profData);
        expect(profResponse.statusCode).toBe(201);
        token = profResponse.body.token;
        professorId = profResponse.body.id;

        const courseData = { name: 'Classe Test', idProfessor: professorId };
        const courseResponse = await request(app).post('/api/course').set('Authorization', `${token}`).send(courseData);
        expect(courseResponse.statusCode).toBe(201);
        courseId = courseResponse.body.id;
    });


    test('POST /api/game devrait créer une partie', async () => {
        const gameData = { 
            idCourse: courseId, 
            teamSize: 4, 
            name: 'Partie Test' };
        const gameResponse = await request(app).post('/api/game').set('Authorization', `${token}`).send(gameData);
        expect(gameResponse.statusCode).toBe(201);
        gameId = gameResponse.body.id;
    });

    test('GET /api/game devrait récupérer toutes les parties', async () => {
        const response = await request(app).get('/api/game').set('Authorization', `${token}`);
        expect(response.statusCode).toBe(200);
    });

    test('GET /api/game/:id devrait récupérer une partie spécifique', async () => {
        const response = await request(app).get(`/api/game/${gameId}`).set('Authorization', `${token}`);
        expect(response.statusCode).toBe(200);
    });

    /*
    ===========================================
    TODO: Test à coriger, car ne fonctionne pas
    ===========================================

    test('DELETE /api/game/:id devrait supprimer une partie', async () => {
        const response = await request(app).delete(`/api/game/${gameId}`).set('Authorization', `${token}`);
        expect(response.statusCode).toBe(201);
    });
    */

    afterAll(async () => {
        // Suppression de la classe et du professeur créés
        await request(app).delete(`/api/course/${courseId}`).set('Authorization', `${token}`);
        await request(app).delete(`/api/professor`).set('Authorization', `${token}`);
    });
});
