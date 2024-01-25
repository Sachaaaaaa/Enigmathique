/* 

================================
  Test des routes /api/student
================================

==============================
 TODO: à corriger 
==============================


// Définition des opérations CRUD pour les team


const request = require('supertest');
const app = 'http://localhost:5000';

let token, professorId, courseId, gameId, teamId;
let studentIds = []; // Initialisation de la variable pour stocker les ID des étudiants

describe('Test des routes /api/team et /api/score', () => {
    beforeAll(async () => {
        // Création d'un professeur pour les tests
        const profData = { lastname: 'Testd', firstname: 'Przdof', mail: 'tezedstprof@example.com', password: 'passdezword' };
        const profResponse = await request(app).post('/api/auth/register').send(profData);
        expect(profResponse.statusCode).toBe(201);
        token = profResponse.body.token;
        professorId = profResponse.body.id;

        // Création d'une classe pour les tests
        const courseData = { name: 'Classe Testdzd', idProfessor: professorId };
        const courseResponse = await request(app).post('/api/course').set('Authorization', `${token}`).send(courseData);
        expect(courseResponse.statusCode).toBe(201);
        courseId = courseResponse.body.id;

        // Création de quelques étudiants pour la classe
        for (let i = 0; i < 5; i++) {
            const studentData = {
                lastname: `Student${i}`,
                firstname: `Test${i}`,
                mail: `student${i}@example.com`,
                idCourse: courseId,
                // Assurez-vous d'inclure tous les champs requis ici
            };
            const studentResponse = await request(app).post('/api/student').set('Authorization', `${token}`).send(studentData);
            expect(studentResponse.statusCode).toBe(201); // Vérifie que le code de statut est 201
            studentIds.push(studentResponse.body.id); // Stocke les ID des étudiants créés
        }

        // Création d'une partie de jeu pour les tests
        const gameData = { idCourse: courseId, teamSize: 4, name: 'Partie Testdzd' };
        const gameResponse = await request(app).post('/api/game').set('Authorization', `${token}`).send(gameData);
        expect(gameResponse.statusCode).toBe(201);
        gameId = gameResponse.body.id;
    });

    test('POST /api/team devrait créer une équipe', async () => {
        const teamData = {
            name: 'Equipe Testdze',
            idGame: gameId,
            members: studentIds
        };
        const teamResponse = await request(app).post('/api/team').set('Authorization', `${token}`).send(teamData);
        expect(teamResponse.statusCode).toBe(201);
        teamId = teamResponse.body.id;
    });

    test('POST /api/score devrait ajouter des scores', async () => {
        const scoreData = {
            idTeam: teamId,
            idGame: gameId,
            scores: [
                {
                    roomName: 'Salle A',
                    score: 100
                }
            ]
        };
        const scoreResponse = await request(app).post('/api/score').set('Authorization', `${token}`).send(scoreData);
        expect(scoreResponse.statusCode).toBe(201);
    });

    test('GET /api/team/game/:id devrait récupérer toutes les équipes d\'une partie', async () => {
        const response = await request(app).get(`/api/team/game/${gameId}`).set('Authorization', `${token}`);
        expect(response.statusCode).toBe(200);
        // Vous pouvez ajouter des vérifications supplémentaires ici si nécessaire
    });

    test('GET /api/team/:id devrait récupérer une équipe spécifique', async () => {
        const response = await request(app).get(`/api/team/${teamId}`).set('Authorization', `${token}`);
        expect(response.statusCode).toBe(200);
        // Vérifiez ici les détails de l'équipe récupérée
    });

    test('GET /api/team/score/:id devrait récupérer les scores d\'une équipe', async () => {
        const response = await request(app).get(`/api/team/score/${teamId}`).set('Authorization', `${token}`);
        expect(response.statusCode).toBe(200);
        // Vérifiez ici les scores de l'équipe récupérés
    });

    test('POST /api/team/student/:id devrait supprimer un élève de l\'équipe', async () => {
        const studentToRemove = studentIds[0]; // Supposons que vous supprimez le premier étudiant de l'équipe
        const response = await request(app).post(`/api/team/student/${studentToRemove}`).set('Authorization', `${token}`);
        expect(response.statusCode).toBe(201);
        // Vérifiez ici si l'étudiant a été supprimé de l'équipe
    });

    test('GET /api/team/students/:id devrait récupérer tous les élèves d\'une équipe', async () => {
        const response = await request(app).get(`/api/team/students/${teamId}`).set('Authorization', `${token}`);
        expect(response.statusCode).toBe(200);
        // Vérifiez ici les élèves de l'équipe récupérés
    });

    // Ajoutez d'autres tests pour les méthodes comme addStudents, removeStudent, findByGame, etc.

    afterAll(async () => {
        // Suppression des étudiants créés
        for (const studentId of studentIds) {
            await request(app).delete(`/api/student/${studentId}`).set('Authorization', `${token}`);
        }

        // Suppression de la partie de jeu
        await request(app).delete(`/api/game/${gameId}`).set('Authorization', `${token}`);

        // Suppression de la classe
        await request(app).delete(`/api/course/${courseId}`).set('Authorization', `${token}`);

        // Suppression du professeur
        await request(app).delete(`/api/professor`).set('Authorization', `${token}`);
    });
});
*/