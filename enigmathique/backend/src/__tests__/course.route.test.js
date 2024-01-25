/*
  ================================
   Test des routes /api/course
  ================================
*/

const request = require('supertest');
const app = 'http://localhost:5000';

let token, courseId1, courseId2, professorId;

describe('Test des routes /api/course', () => {

    beforeAll(async () => {
        // Création d'un professeur pour les tests
        const newProfessorData = {
            lastname: 'Lolo',
            firstname: 'bergery',
            mail: 'lolo@example.com',
            password: 'password1234'
        };

        const profResponse = await request(app)
            .post('/api/auth/register')
            .send(newProfessorData);

        expect(profResponse.statusCode).toBe(201);
        token = profResponse.body.token; 
        professorId = profResponse.body.id; 
    });


    test('POST /api/course devrait créer une classe', async () => {
        const newCourseData1 = {
            name: 'Secondes test',
            idProfessor: professorId
        };

        const courseResponse1 = await request(app)
            .post('/api/course')
            .set('Authorization', `${token}`)
            .send(newCourseData1);

        expect(courseResponse1.statusCode).toBe(201);
        courseId1 = courseResponse1.body.id;

        const newCourseData2 = {
            name: 'Secondes test2',
            idProfessor: professorId
        };

        const courseResponse2 = await request(app)
            .post('/api/course')
            .set('Authorization', `${token}`)
            .send(newCourseData2);

        expect(courseResponse2.statusCode).toBe(201);
        courseId2 = courseResponse2.body.id;
    });

    test('GET /api/course devrait récupérer les classes', async () => {
        const response = await request(app)
            .get('/api/course')
            .set('Authorization', `${token}`);

        expect(response.statusCode).toBe(200);
    });

    test('GET /api/course/:id devrait récupérer une classe spécifique', async () => {
        const response = await request(app)
            .get(`/api/course/${courseId1}`)
            .set('Authorization', `${token}`);

        expect(response.statusCode).toBe(200);
    });

    test('PUT /api/course/:id devrait mettre à jour une classe', async () => {
        const updatedCourseData = {
            name: 'Secondes 1 modifié',
            idProfessor: professorId
        };

        const response = await request(app)
            .put(`/api/course/${courseId1}`)
            .set('Authorization', `${token}`)
            .send(updatedCourseData);

        expect(response.statusCode).toBe(201);
    });

    test('DELETE /api/course/:id devrait supprimer une classe', async () => {
        const response1 = await request(app)
            .delete(`/api/course/${courseId1}`)
            .set('Authorization', `${token}`);

        expect(response1.statusCode).toBe(201);

        const response2 = await request(app)
            .delete(`/api/course/${courseId2}`)
            .set('Authorization', `${token}`);

        expect(response2.statusCode).toBe(201);
    });

    afterAll(async () => {
        // Suppression du professeur
        await request(app)
            .delete(`/api/professor`)
            .set('Authorization', `${token}`);
    });
});
