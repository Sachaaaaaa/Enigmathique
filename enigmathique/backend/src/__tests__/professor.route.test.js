const request = require('supertest');
const express = require('express');
const professorRoutes = require('../routes/professor.route');

const app = 'http://localhost:5000'; // Remplacez 'app' par l'URL de votre serveur

// Mock du middleware verifyToken
jest.mock('../routes/middleware.js', () => ({
  verifyToken: (req, res, next) => next()
}));

let token; // Pour stocker le token JWT
let professorId; // Pour stocker l'ID du professeur créé

describe('Test des routes /api/professor', () => {

  // Test de création d'un professeur
  test('POST /api/professor devrait créer un professeur', async () => {
    const newProfessorData = {
      lastname: 'Dupontb',
      firstname: 'Jean',
      mail: 'jeandupont@example.com',
      password: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(newProfessorData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token'); // Vérifiez que le token est renvoyé
    token = response.body.token; // Stockez le token JWT pour les tests suivants
    professorId = response.body.id; // Stockez l'ID du professeur créé
  });

  // Test de suppression d'un professeur
  test('DELETE /api/professor/:id devrait supprimer un professeur', async () => {
    const response = await request(app)
      .delete(`/api/professor/`) // Utilisez l'ID du professeur créé
      .set('Authorization', `Bearer ${token}`); // Incluez le token JWT pour l'authentification

    expect(response.statusCode).toBe(200); // Assurez-vous que le statut est 200 (OK)
    // Autres assertions si nécessaire, par exemple, vérifier le message de réponse
  });

});