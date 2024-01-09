const request = require('supertest');
const express = require('express');
const professorRoutes = require('../routes/professor.route'); // Ajustez le chemin selon votre structure

const app = express();
professorRoutes(app);

// Mock du middleware verifyToken
jest.mock('../routes/middleware.js', () => ({
  verifyToken: (req, res, next) => next()
}));

describe('Test des routes /api/professor', () => {
  // Test pour récupérer tous les professeurs
  test('GET / devrait répondre avec une liste de professeurs', async () => {
    const response = await request(app).get('/api/professor');
    if (response.statusCode !== 200) {
        console.log(response.body);
    }
    expect(response.statusCode).toBe(200);
    });

});
