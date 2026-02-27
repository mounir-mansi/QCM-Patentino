# QCM Patentino 🚜

Application développée pendant ma formation de développeur web, adaptée pour aider un ami à préparer son permis de cariste italien (Patentino di muletto).

## Stack technique

**Frontend**

- Next.js 13 (Pages Router)
- TypeScript
- Tailwind CSS
- Flowbite React

**Backend**

- Node.js + Express
- Prisma ORM v6
- MySQL (XAMPP)
- JWT pour l'authentification
- Argon2 pour le hashage des mots de passe
- Zod pour la validation des données

## Prérequis

- Node.js v20+
- XAMPP (MySQL sur le port 3307)
- Git

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/mounir-mansi/QCM-Patentino.git
cd QCM-Patentino
```

### 2. Backend

```bash
cd quiz-backend
npm install
```

Créer un fichier `.env` :

```env
DATABASE_URL="mysql://root:PASSWORD@localhost:3307/dbquiz"
JWT_SECRET=votre_clé_secrète_très_longue
```

Initialiser la base de données :

```bash
npx prisma migrate dev
npx prisma db seed
```

Lancer le serveur :

```bash
npm run start
```

Le backend tourne sur `http://localhost:5500`

### 3. Frontend

```bash
cd quiz-frontend
npm install
npm run dev
```

Le frontend tourne sur `http://localhost:3000`

## Fonctionnalités

- Inscription et connexion avec authentification JWT
- Sélection de module et niveau (facile / intermédiaire / difficile)
- Quiz avec timer de 45 secondes par question
- Surlignage des bonnes/mauvaises réponses après validation
- Système anti-répétition des questions déjà vues
- Historique des scores par utilisateur
- Déconnexion automatique après 30 minutes d'inactivité

## Structure du projet

```
QCM-Patentino/
├── quiz-backend/
│   ├── middleware/         # Authentification JWT
│   ├── prisma/
│   │   ├── CRUD/           # Fonctions d'accès à la base de données
│   │   ├── client.js       # Instance Prisma partagée
│   │   └── seed.js         # Données initiales
│   ├── routes/             # Routes Express
│   └── server.js
└── quiz-frontend/
    ├── components/         # Composants React réutilisables
    ├── hooks/              # Hooks personnalisés
    ├── pages/              # Pages Next.js
    └── public/             # Assets statiques
```

## API

| Méthode | Route                | Description             | Auth |
| ------- | -------------------- | ----------------------- | ---- |
| POST    | /users/signup        | Inscription             | Non  |
| POST    | /users/login         | Connexion               | Non  |
| GET     | /users/:id           | Profil utilisateur      | Oui  |
| GET     | /module              | Liste des modules       | Non  |
| GET     | /question/random-50  | Questions aléatoires    | Oui  |
| GET     | /answer/question/:id | Réponses d'une question | Oui  |
| GET     | /answer/:id          | Une réponse             | Oui  |
| POST    | /achievment          | Enregistrer un score    | Oui  |
| GET     | /achievment/user/:id | Scores d'un utilisateur | Oui  |

## Sécurité

- Mots de passe hashés avec Argon2
- Authentification par token JWT (expiration 1h)
- Validation des données entrantes avec Zod
- Routes sensibles protégées par middleware
- Variables d'environnement pour les données sensibles
