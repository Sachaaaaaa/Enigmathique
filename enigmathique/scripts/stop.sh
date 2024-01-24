#!/bin/bash
# Encore moins propre
docker-compose -f docker-compose.db.yml down
# Stop tout les processus node
killall node
