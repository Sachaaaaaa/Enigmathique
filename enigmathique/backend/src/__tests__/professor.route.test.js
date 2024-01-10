/*
  ==============================
  Test des routes /api/professor
  ==============================
*/


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
    expect(response.body).toHaveProperty('token'); // On vérifie que le token est renvoyé
    token = response.body.token; // Stock le token JWT pour les tests suivants
    professorId = response.body.id; // Stock l'ID du professeur créé
  });


  // Test de récupération d'un professeur (sans son id)
  test('GET /api/professor devrait récupérer un professeur', async () => {
    const response = await request(app)
      .get('/api/professor')
      .set('Authorization', `${token}`); // token JWT pour l'authentification

    expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    expect(response.body).toHaveProperty('id'); // On vérifie que le professeur est renvoyé
  });

  // Test de mise à jour d'un professeur (sans son id)
  test('PUT /api/professor devrait mettre à jour un professeur', async () => {
    const updatedProfessorData = {
      lastname: 'Dupont',
      firstname: 'Jean',
      mail: 'jeandupontmodif@example.com',
      password: 'password123modif'
    };
    const response = await request(app)
      .put(`/api/professor`)
      .set('Authorization', `${token}`) // Token JWT pour l'authentification
      .send(updatedProfessorData);

    expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
    expect(response.body).toHaveProperty('id'); // On vérifie que le professeur est renvoyé
  });


  // Test de suppression d'un professeur
  test('DELETE /api/professor/:id devrait supprimer un professeur', async () => {
    const response = await request(app)
      .delete(`/api/professor`)
      .set('Authorization', `${token}`); // Incluez le token JWT pour l'authentification

    expect(response.statusCode).toBe(200); // On s'assure que le statut est 200 (OK)
  });


});