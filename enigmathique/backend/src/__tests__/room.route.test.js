/**
 * Définition des opérations CRUD pour les classes
*/

// /!\ supprimer à la main dans la DB les salles pour réexécuter les tests.
// (car il n'y a pas de méthode delete pour les salles)

const request = require('supertest');
const app = 'http://localhost:5000'; // Remplacez par l'URL de votre serveur


describe('Test des routes /api/room', () => {
    let token; // Token JWT pour l'authentification

    beforeAll(async () => {
        const profResponse = await request(app)
            .post('/api/auth/register')
            .send({
                lastname: 'daddz',
                firstname: 'tedadaazdst',
                mail: 'sacdaddahatestdad@example.com',
                password: 'password1234dadad'
            });

        if (profResponse.statusCode !== 201) {
            throw new Error(`Erreur lors de la création du professeur: ${profResponse.body.message}`);
        }

        token = profResponse.body.token;
    });


    // Test de création d'une salle A
    test('POST /api/room devrait créer une salle', async () => {
        const newRoomData = {
            name: 'Salle A',
            chapter: 'nombres',
            difficulty: 'Facile'
        };

        const response = await request(app)
            .post('/api/room')
            .set('Authorization', `${token}`) // Ajout de l'en-tête d'autorisation
            .send(newRoomData);

        expect(response.statusCode).toBe(201);
    });

    // Test de création d'une salle B
    test('POST /api/room devrait créer une salle', async () => {
        const newRoomData = {
            name: 'Salle B',
            chapter: 'nombres',
            difficulty: 'moyen'
        };

        const response = await request(app)
            .post('/api/room')
            .set('Authorization', `${token}`) // Ajout de l'en-tête d'autorisation
            .send(newRoomData);

        expect(response.statusCode).toBe(201);
    });

    // Test de récupération de toutes les salles
    test('GET /api/room devrait récupérer toutes les salles', async () => {
        const response = await request(app)
            .get('/api/room')
            .set('Authorization', `${token}`); // Ajout de l'en-tête d'autorisation

        expect(response.statusCode).toBe(200);
    });
   
    

    afterAll(async () => {
        await request(app)
            .delete(`/api/professor`)
            .set('Authorization', `${token}`);
    });
});
