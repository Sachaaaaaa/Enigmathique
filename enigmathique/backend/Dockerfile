FROM node:21-alpine

# Met l'environnement en mode développement
ENV NODE_ENV=docker

# Créer répertoire de l'application
RUN mkdir -p /app
WORKDIR /app

# Copie tout
COPY . .

# Installe les packages
RUN npm install

# Expose le port
EXPOSE 5000

# Démarre le serveur
CMD [ "npm", "run", "dev" ]
