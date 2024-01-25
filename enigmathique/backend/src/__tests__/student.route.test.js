/*
  ================================
   Test des routes /api/student
  ================================
*/
const request = require('supertest');
const app = 'http://localhost:5000';

let token, courseId, professorId, studentId1, studentId2;

describe('Test des routes /api/student', () => {
    beforeAll(async () => {
        // Créer un professeur
        const profResponse = await request(app)
            .post('/api/auth/register')
            .send({
                lastname: 'Lolosz',
                firstname: 'bergerysa',
                mail: 'lolosaz@example.com',
                password: 'password1234sza'
            });
        expect(profResponse.statusCode).toBe(201);
        token = profResponse.body.token;
        professorId = profResponse.body.id;

        // Créer une classe
        const courseResponse = await request(app)
            .post('/api/course')
            .set('Authorization', `${token}`)
            .send({
                name: 'Secondes 1 test',
                idProfessor: professorId
            });
        expect(courseResponse.statusCode).toBe(201);
        courseId = courseResponse.body.id;
    });


    // Test de création d'un élève
    test('POST /api/student devrait créer un élève', async () => {
        const newStudentData = {
            lastname: 'Eleve1',
            firstname: 'Test1',
            idCourse: courseId
        };

        const response = await request(app)
            .post('/api/student')
            .set('Authorization', `${token}`)
            .send(newStudentData);

        expect(response.statusCode).toBe(201);
        studentId1 = response.body.id;
    });

    // Test de création d'un second élève
    test('POST /api/student devrait créer un second élève', async () => {
        const newStudentData = {
            lastname: 'Eleve2',
            firstname: 'Test2',
            idCourse: courseId
        };

        const response = await request(app)
            .post('/api/student')
            .set('Authorization', `${token}`)
            .send(newStudentData);

        expect(response.statusCode).toBe(201);
        studentId2 = response.body.id;
    });

    // Test de récupération des informations d'un élève
    test('GET /api/student/:id devrait récupérer les informations de l\'élève', async () => {
        const response = await request(app)
            .get(`/api/student/${studentId1}`)
            .set('Authorization', `${token}`);

        expect(response.statusCode).toBe(200);
    });

    // Test de suppression d'un élève
    test('DELETE /api/student/:id devrait supprimer un élève', async () => {
        const response = await request(app)
            .delete(`/api/student/${studentId1}`)
            .set('Authorization', `${token}`);

        expect(response.statusCode).toBe(201);
    });

    // Test de suppression du second élève
    test('DELETE /api/student/:id devrait supprimer un second élève', async () => {
        const response = await request(app)
            .delete(`/api/student/${studentId2}`)
            .set('Authorization', `${token}`);

        expect(response.statusCode).toBe(201);
    });

    afterAll(async () => {
        // Supprimer les élèves, la classe et le professeur créés
        await request(app).delete(`/api/student/${studentId1}`).set('Authorization', `${token}`);
        await request(app).delete(`/api/student/${studentId2}`).set('Authorization', `${token}`);
        await request(app).delete(`/api/course/${courseId}`).set('Authorization', `${token}`);
        await request(app).delete(`/api/professor`).set('Authorization', `${token}`);
    });
});
