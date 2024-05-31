const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors') ;


app.use(cors());

// Utiliser morgan pour enregistrer les requêtes HTTP dans le terminal
app.use(morgan('dev'));

// Middleware pour parser le contenu JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques (CSS, JavaScript, images)
app.use(express.static('public'));

// Route simple pour la page d'accueil
app.get('/', (req, res) => {
  res.send(`Bienvenue sur mon site web!`);
});

// Routes pour les articles, catégories et commentaires
const articlesRouter = require('./routes/articles');
const categoriesRouter = require('./routes/categories');
const commentairesRouter = require('./routes/commentaires');
const usersRouter = require('./routes/users');

console.log(articlesRouter);
app.use('/articles', articlesRouter);
app.use('/categories', categoriesRouter);
app.use('/commentaires', commentairesRouter);
app.use('/users', usersRouter);

// Gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Désolé, cette page n'existe pas !");
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});