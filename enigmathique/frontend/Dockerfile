FROM node:21-alpine

# Créer répertoire de l'application
RUN mkdir -p /app
WORKDIR /app

# Copie tout
COPY . .

# Installe les packages
RUN npm install

# Expose le port
EXPOSE 3000

# Démarre le serveur
CMD [ "npm", "start" ]