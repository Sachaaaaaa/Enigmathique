#!/bin/bash
# Pas propre du tout
docker-compose -f docker-compose.db.yml up -d
cd ./backend
npm run start &
cd ../frontend
npm run start &
cd ../game
npm run start &


