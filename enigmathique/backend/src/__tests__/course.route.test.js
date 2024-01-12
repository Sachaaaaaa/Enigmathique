/*
  ==============================
   Test des routes /api/course
  ==============================
*/
const request = require('supertest');
const app = 'http://localhost:5000'; 

let token; // Pour stocker le token JWT
let courseId1; // Pour stocker l'ID de la classe créée
let courseId2; // Pour stocker l'ID de la classe créée n°2
let professorId; // Pour stocker l'ID du professeur créé

describe('Test des routes /api/course', () => {

    // Création d'un professeur pour les tests
    test('POST /api/professor devrait créer un professeur', async () => {
        const newProfessorData = {
        lastname: 'Lolo',
        firstname: 'bergery',
        mail: 'lolo@example.com',
        password: 'password1234'
        };

        const response = await request(app)
        .post('/api/auth/register')
        .send(newProfessorData);

        expect(response.statusCode).toBe(201);
        token = response.body.token; // Stock le token JWT pour les tests suivants
        professorId = response.body.id; // Stock l'ID du professeur créé
    });

    // Test de création d'une classe Seconde 1
    test('POST /api/course devrait créer une classe', async () => {
        const newCourseData = {
        name: 'Secondes test', // Nom de la classe
        idProfessor: professorId // ID du professeur 
        };

        const response = await request(app)
        .post('/api/course')
        .set('Authorization', `${token}`)
        .send(newCourseData);

        expect(response.statusCode).toBe(201);
        courseId1 = response.body.id; // Stocke l'ID de la classe créée
    });

    // Test de création d'une classe Seconde 2
    test('POST /api/course devrait créer une classe', async () => {
        const newCourseData = {
        name: 'Secondes test2', // Nom de la classe
        idProfessor: professorId // ID du professeur 
        };

        const response = await request(app)
        .post('/api/course')
        .set('Authorization', `${token}`)
        .send(newCourseData);

        expect(response.statusCode).toBe(201);
        courseId2 = response.body.id; // Stocke l'ID de la classe créée
    });

    // Test de récupération des classes
    test('GET /api/course devrait récupérer les classes', async () => {
        const response = await request(app)
        .get('/api/course')
        .set('Authorization', `${token}`); // Token JWT pour l'authentification

        expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    });

    // Test de récupération d'une classe par id
    test('GET /api/course/id devrait récupérer les élèves de la seconde 1', async () => {
        const response = await request(app)
        .get(`/api/course/${courseId1}`) // ID de la classe
        .set('Authorization', `${token}`); // Token JWT pour l'authentification

        expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    });

    // Test de modification de la classe Seconde 1
    test('PUT /api/course/id devrait mettre à jour une classe', async () => {
    const updatedCourseData = {
        name: 'Secondes 1 modifié', // Nom de la classe modifié
        idProfessor: professorId, // ID du professeur 
    };

    const response = await request(app)
        .put(`/api/course/${courseId1}`) 
        .set('Authorization', `${token}`)
        .send(updatedCourseData);

    expect(response.statusCode).toBe(201); // On s'assure que le statut est 200 (OK)
    });

    // Test de suppression de la classe Seconde 1
    test('DELETE /api/course/id devrait supprimer la classe Seconde 1', async () => {
        const response = await request(app)
        .delete(`/api/course/${courseId1}`) // ID de la classe
        .set('Authorization', `${token}`)

        expect(response.statusCode).toBe(201);

    });

    // Test de suppression de la classe Seconde 2
    test('DELETE /api/course/id devrait supprimer la classe Seconde 2', async () => {
        const response = await request(app)
        .delete(`/api/course/${courseId2}`) // ID de la classe
        .set('Authorization', `${token}`)

        expect(response.statusCode).toBe(201);

    });

     // Suppression du professeur
    test('DELETE /api/professor/ devrait supprimer le professeur', async () => {
        const response = await request(app)
        .delete(`/api/professor`)
        .set('Authorization', `${token}`); // Inclue le token JWT pour l'authentification

        expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    });
});