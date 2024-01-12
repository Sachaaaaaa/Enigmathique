/*
  ================================
   Test des routes /api/professor
  ================================
*/


const request = require('supertest');
const app = 'http://localhost:5000'; 

let token; // Pour stocker le token JWT
let studentId1; // Pour stocker l'ID de l'élève créé
let studentId2; // Pour stocker l'ID de l'élève créé n°2
let courseId; // Pour stocker l'ID de la classe créée
let professorId; // Pour stocker l'ID du professeur créé

describe('Test des routes /api/student', () => {
    // Création d'un professeur pour les tests
    test('POST /api/professor devrait créer un professeur', async () => {
        const newProfessorData = {
        lastname: 'sacha',
        firstname: 'test',
        mail: 'sachatest@example.com',
        password: 'password1234'
        };

        const response = await request(app)
        .post('/api/auth/register')
        .send(newProfessorData);

        expect(response.statusCode).toBe(201);
        token = response.body.token; // Stock le token JWT pour les tests suivants
        professorId = response.body.id; // Stock l'ID du professeur créé
    });

    // Création d'une classe Seconde 1 pour les tests
    test('POST /api/course devrait créer une classe', async () => {
        const newCourseData = {
        name: 'Secondes 1', // Nom de la classe
        idProfessor: professorId // ID du professeur 
        };

        const response = await request(app)
        .post('/api/course')
        .set('Authorization', `${token}`)
        .send(newCourseData);

        expect(response.statusCode).toBe(201);
        courseId = response.body.id; // Stocke l'ID de la classe créée
    });

    // Test de création d'un élève
    test('POST /api/student devrait créer un élève', async () => {
        const newStudentData = {
            lastname: 'eleve',
            firstname: 'test',
            idCourse: courseId // ID de la classe
        };

        const response = await request(app)
            .post('/api/student')
            .set('Authorization', `${token}`)
            .send(newStudentData);

        expect(response.statusCode).toBe(201);
        studentId1 = response.body.id; // Stocke l'ID de l'élève créé
    });

    // Test de création d'un élève n°2
    test('POST /api/student devrait créer un élève', async () => {
        const newStudentData = {
            lastname: 'eleve2',
            firstname: 'test2',
            idCourse: courseId // ID de la classe
        };

        const response = await request(app)
            .post('/api/student')
            .set('Authorization', `${token}`)
            .send(newStudentData);

        expect(response.statusCode).toBe(201);
        studentId2 = response.body.id; // Stocke l'ID de l'élève créé
    });
    

    // Test de récupération des élève d'une classe du professeur
    test('GET /api/student devrait récupérer un élève', async () => {
        const response = await request(app)
            .get('/api/student')
            .set('Authorization', `${token}`) // Token JWT pour l'authentification
            .send({ idCourse: courseId }); // ID de la classe

        expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    });

    // Test de récupération des élève des classe du professeur
    test('GET /api/student devrait récupérer un élève', async () => {
        const response = await request(app)
            .get('/api/student')
            .set('Authorization', `${token}`) // Token JWT pour l'authentification

        expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    });


    /* TODO: décommenter les tests suivants lorsque la méthode delete sera implémentée (dans le controller et le routeur)

    // Test suppression d'un élève
    test('DELETE /api/student/:id devrait supprimer un élève', async () => {
        const response = await request(app)
            .delete(`/api/student/`)
            .set('Authorization', `${token}`) // Token JWT pour l'authentification
            .send({ id: studentId1 }); // ID de l'élève à supprimer

        expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    });

    // Test suppression d'un élève
    test('DELETE /api/student/:id devrait supprimer un élève', async () => {
        const response = await request(app)
            .delete(`/api/student/`)
            .set('Authorization', `${token}`) // Token JWT pour l'authentification
            .send({ id: studentId2 }); // ID de l'élève à supprimer

        expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    });

    // suppression de la classe
    test('DELETE /api/course/:id devrait supprimer une classe', async () => {
        const response = await request(app)
            .delete(`/api/course/`)
            .set('Authorization', `${token}`) // Token JWT pour l'authentification
            .send({ id: courseId }); // ID de la classe à supprimer

        expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    });

    // Suppression du professeur
    test('DELETE /api/professor/:id devrait supprimer un professeur', async () => {
        const response = await request(app)
        .delete(`/api/professor`)
        .set('Authorization', `${token}`); // Inclue le token JWT pour l'authentification

        expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)

    });

    */
});
