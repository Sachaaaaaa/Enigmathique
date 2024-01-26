### Équipe `LogiGre Edutainment`

<dl>
<dt>Chef projet</dt>
<dd>DUPUIS Thibaut</dd>
<dt>Membres</dt>
<dd>

- BERGERY Loïc
- BRIAND Damien
- DALBAN Yvain
- GUILLEVIC Mathéo
- PIVOT Raphaël
- TARDY Mathéo
- WOS Sacha

</dd>
</dl>

---

Le site : https://77.129.53.78:25565/
Documentation : http://77.129.53.78/doc.html

# Important

Pour notre site, nous utilisons le port 25565, qui est souvent bloqué sur les réseaux publics. Si ce port est bloqué sur votre réseau, vous devrez donc vous connecter à un réseau privé. 

# Jouer

## Créer un compte
Pour bénéficier des fonctionnalités réservées aux professeurs, un compte est indispensable.

Si vous vous connectez pour la première fois, il faudra alors vous créer un compte.

_Note : une adresse e-mail ne peut être associée qu'à un seul compte, et votre mot de passe doit comporter au moins 8 caractères._

Si vous possédez déjà un compte, veuillez-vous connecter.

## Créer les éléments nécessaires
Afin de créer une partie, vous devez d'abord créer une classe ainsi que des élèves.

## Lancer la partie
Lorsque vous démarrez une partie, vous devez choisir la classe contenant les élèves avec lesquels vous souhaitez jouer, puis sélectionner les salles désirées. Un code sera généré à ce moment-là, que vous devrez partager avec vos élèves. Ces derniers devront le saisir sur la page d'accueil.

Chaque groupe d'élèves devra sélectionner les noms des élèves le composant ainsi qu'un nom d'équipe. Une fois ces informations soumises, vous recevrez les détails et aurez la possibilité de valider ou de rejeter ces équipes.
Si les équipes ne s'affichent pas en direct dans la vue du professeur, cela peut être dû à un problème de connexion, vous aurez alors seulement à actualiser la page.

_Note : si vous retournez à l'accueil avant de lancer la partie, vous avez toujours la possibilité de reprendre la création en retournant dans la liste de vos parties et en cliquant sur le logo play._

## Déroulement de la partie

Une fois les équipes validées, vous pouvez lancer la partie et suivre le score en direct. 

Une fois la partie terminée, vous pouvez consulter les scores dans la section "statistique" dans "Partie".

# Utiliser/Configurer le serveur


## Connexion serveur
Le serveur sur lequel est hébergé notre site n’est pas accessible au public, si vous voulez vous connecter en ssh, il faudra donc d’abord passer par transit :
```ssh votreLogin@transit.iut2.univ-grenoble-alpes.fr```  
pour ensuite se connecter réellement au serveur :  
```ssh dev@192.168.14.134```  
ou à la base de donnée :  
```psql -h 192.168.14.234 -U dev -d enigmathique ```  

Dans les deux cas, les identifiants sont :
- login: dev
- mot de passe : enigmathique

_Note : nous vous conseillons d'utiliser la connexion par clé pour plus de sécurité._


## Configurer les variables d'environnement

Dans un souci de sécurité, les variables sensibles telles que le token, le poivre, la clé secrète du site et plus généralement tous les éléments nécessaires au bon fonctionnement du site sont stockés dans des .env.

_Note : pour des raisons de sécurité ces .env sont placés dans un .gitignore donc si vous faites un git clone, vous devrez créer et renseigner ces .env manuellement_

### Créer les .env
Il faut donc créer et remplir les .env suivants :

Dans /backend/.env :


```
GAME_TOKEN=<GAME_TOKEN>
SECRET_KEY=<SECRET_KEY>
PEPPER_KEY=<PEPPER_KEY>
```

Dans /frontend/.env :
```
REACT_APP_DEV_API_URL=https://77.129.53.78:25565/api/
REACT_APP_DEV_SOCKET_URL=https://77.129.53.78:25565

REACT_APP_PROD_API_URL=http://77.129.53.78:25565/api/
REACT_APP_PROD_SOCKET_URL=http://77.129.53.78:25565
```

Dans /game/.env :
```
API_TOKEN=<GAME_TOKEN>
API_URL=http://localhost:5000/api/
```


## Configuration ssh

Notre serveur n'étant pas publique de base, nous utilisons un intermédiaire public (rasberry PI 5) pour rediriger le trafic.
Pour cela, nous utilisons un reverse tunnel SSH depuis le serveur vers le rasberry PI.
le script qui lance ce tunnel est disponible à /home/dev/scriptSSH :
```sh
#!/bin/bash

# Vérifier si autossh est déjà en cours d'exécution
if pgrep -f "autossh" > /dev/null; then
    echo "Le tunnel SSH est déjà en cours d'exécution."
else
    # Si autossh n'est pas en cours d'exécution, démarrer le tunnel
    autossh -M 0 -f -N -R 25565:localhost:443 -p 53241 -i ~/.ssh/id_rsa_rpi dev@77.129.53.78
    echo "Tunnel SSH démarré avec succès."
fi

```

Ce script établit la connexion et la relance si cette dernière n'est plus active, cependant, il est nécessaire d'avoir un logiciel qui exécute ce script toutes les minutes afin de relancer le tunnel SSH automatiquement en cas de fermeture.
Pour cela, nous utilisons ```cron``` pour mettre en place des tâches planifiées.
Il lance le script SSH toutes les minutes.


## Reverse proxy

Nous utilisons un seul port pour nos trois services (frontend, backend, game) puis nous redirigeons les requêtes vers leurs ports locaux correspondants, ceci est fait par un reverse proxy, la configuration est disponible ici : ```/etc/apache2/sites-available/enigmathique.fr.conf``` :


```
<VirtualHost *:443>
    ServerName 192.168.14.134

    <Directory /var/www/enigmathique>
        AllowOverride All
    </Directory>

    # Pour https
    SSLEngine On
    SSLCertificateFile /etc/ssl/certs/enigmathique.fr.crt
    SSLCertificateKeyFile /etc/ssl/private/enigmathique.fr.key

RewriteEngine on
RewriteCond ${HTTP:Upgrade} =websocket [NC]
RewriteRule /(.*) http://localhost:4000/$1 [P,L]

    # Configuration du Reverse Proxy pour l'application React
    <Location "/">
        ProxyPass "http://localhost:3000/"
        ProxyPassReverse "http://localhost:3000/"
    </Location>

    # Configuration du Reverse Proxy pour l'API
    <Location "/api/">
        ProxyPass "http://localhost:5000/api/"
        ProxyPassReverse "http://localhost:5000/api/"
    </Location>

<Location "/socket.io/">
ProxyPass "http://localhost:4000/socket.io/"
ProxyPassReverse "http://localhost:4000/socket.io/"
</Location>


</VirtualHost>

<VirtualHost *:80>
    ServerName 192.168.14.134
    Redirect permanent / https://192.168.14.134/
</VirtualHost>
```


## Lancement de la backend, frontend et du jeu

Pour gérer nos différents services, nous utilisons des units systemd.
Nous les utilisons avec les commandes suivantes :
```
// Pour voir le status des différents services :
systemctl status enigmathique-backend.service
systemctl status enigmathique-frontend.service
systemctl status enigmathique-game.service

// Pour relancer des différents services :
systemctl restart enigmathique-backend.service
systemctl restart enigmathique-frontend.service
systemctl restart enigmathique-game.service

// Modifier les units :
nano /etc/systemd/system/enigmathique-backend.service
nano /etc/systemd/system/enigmathique-frontend.service
nano /etc/systemd/system/enigmathique-game.service
```
Voici le contenu typique d'un unit : 
```
[Unit]
Description= Enigmathique Backend
After=network.target

[Service]
ExecStart=npm run start -C /home/dev/app/rendus/enigmathique/leService
Restart=always
User=jhon
Group=jhon

[Install]
WantedBy=multi-user.target
```

Nous avons remplit les champs ```User``` et ```Group``` avec un utilisateur dédié à cette tâche, qui ne possède pas de bash, comme cela, même si cet utilisateur est compromis, l'attaquant ne pourra pas se connecter (c'est le principe du moindre privilège).

Si le lancement provoque des erreurs cela peut être, car vous n'avez pas tous les packages, pour palier cela, faites ```npm i``` dans les répertoires backend, frontend et game.

# Utiliser l'API

L'api utilise un système de token, avant d'appeler n'importe quelle route de l'API il vous faudra donc générer un token.

L'API possède deux types de routes :

- Les routes utilisées directement par le frontend (visible avec inspecter l'élément).

- Les routes utilisées par la backend, impossible à voir pour un utilisateur.

La première catégorie de route utilise un token "professeur" qui est généré avec une connexion ou un enregistrement.
__Ces routes sont documentées et disponibles à l'adresse suivante :
```http://77.129.53.78/doc.html ```__
Elles possèdent également des tests unitaires afin de garantir leur stabilité.
Si vous voulez exécuter ces tests, positionnez-vous dans le répertoire backend et lancez : ``` npm run dev ```

Les routes utilisées par la backend, utilisent un token unique : ```<GAME_TOKEN>```

## Tester avec l'API

Si des modifications doivent être apportées à l'API, il est crucial de tester sa pérennité. À cet effet, nous avons mis en place des tests unitaires couvrant la majorité des méthodes de l'API.
Pour les utiliser, vous avez seulement à vous positionner dans le répertoire /backend/ puis lancer ```npm run test```

