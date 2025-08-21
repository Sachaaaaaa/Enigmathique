## 🎯 Objectif du projet
Créer un **jeu d’énigmes web coopératif** axé sur les mathématiques, destiné aux élèves de seconde.  
Ce projet vise à rendre l’apprentissage plus **ludique**, **collaboratif** et **immersif** tout en respectant les contraintes pédagogiques, techniques et légales (RGPD).  

Nous avons dû prendre en compte plusieurs contraintes :  
- **Pédagogiques** : adapter les énigmes au programme officiel de mathématiques.  
- **Techniques** : gérer le temps réel, l’intégration 3D et la scalabilité.  
- **Organisationnelles** : travail en équipe de 8 développeurs en méthode agile.  
- **Légales** : conformité au RGPD et mise en place du Privacy by Design.  

---

## 🛠️ Stack technique
- **Frontend** : React (ergonomie, modularité, accessibilité avec option *OpenDyslexic*)  
- **Backend** : Node.js avec Express (API REST sécurisée, websockets pour le temps réel)  
- **Base de données** : PostgreSQL (stabilité, sécurité, conformité RGPD)  
- **Outils** : Jira (gestion Agile), GitLab (CI/CD & versioning), Talend (jeu de données tests)  

---

## 🚀 Fonctionnalités clés et contraintes associées
- **Récolte et exploitation des données par le professeur**  
  ➝ stockage en base PostgreSQL, anonymisation, chiffrement et conformité RGPD  
- **Salles d’énigmes en 3D**  
  ➝ problématique d’intégration web 3D et optimisation des performances  
- **Jeu coopératif en équipe**  
  ➝ gestion du temps réel via WebSockets, synchronisation entre joueurs et résilience réseau  

---

## 📚 Ce que j’ai appris / mis en pratique
- **Choix technologiques sous contraintes de sécurité** :  
  - Hashage sécurisé des mots de passe (argon2 + salage/poivrage)  
  - SGBD robuste et mature (PostgreSQL vs alternatives)  
  - Frameworks adaptés (React, Express)  
- **Création d’une API REST sécurisée** :  
  - Authentification et autorisation via **OAuth2** et **JWT**  
  - Application du *Principle of Least Privilege*  
  - Conformité aux recommandations **OWASP Top 10** et **ANSSI**  
- **Gestion de la sécurité applicative** :  
  - Vérification et validation stricte des entrées utilisateurs  
  - Limitation du brute-force (rate limiting)  
  - Sécurisation des communications (HTTPS, TLS)  
- **Documentation et collaboration** :  
  - Rédaction d’une documentation technique claire via **Swagger/OpenAPI**  
  - Organisation Agile (Scrum/Kanban), découpage en itérations  
  - Communication en équipe avec GitLab et Jira  

---
