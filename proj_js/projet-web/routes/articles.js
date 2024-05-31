const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');


router.get('/', async (req, res) => {
    // Récupération des paramètres de requête 'take' et 'skip' de l'URL
    const take = parseInt(req.query.take) || 10; // Si 'take' n'est pas spécifié dans l'URL, prendre 10 articles par défaut
    const skip = parseInt(req.query.skip) || 0; // Si 'skip' n'est pas spécifié dans l'URL, ne pas sauter d'articles par défaut

    try {
        // Logique pour récupérer les articles à partir de la base de données
        const articles = await prisma.article.findMany({
            take: take,
            skip: skip
        });
        res.json(articles); // Envoie les articles récupérés au client en format JSON
    } catch (error) {
        console.error("Failed to fetch articles:", error);
        res.status(500).send("Unable to fetch articles.");
    }
});


router.get('/:id', async (req, res) => {
    const articleId = parseInt(req.params.id); // Convertir l'ID de la catégorie en nombre

    try {
        const article = await prisma.article.findUnique({
            where: { id: articleId }
        });

        if (!article) {
            return res.status(404).send('Category not found.');
        }

        res.json(article); // Envoyer la catégorie récupérée en réponse
    } catch (error) {
        console.error("Failed to fetch category:", error);
        res.status(500).send("Unable to fetch category.");
    }
});


//router.get('/', (req, res) => {
    // Récupération des paramètres de requête 'take' et 'skip' de l'URL
    //const take = req.query.take || 10; // Si 'take' n'est pas spécifié dans l'URL, prendre 10 articles par défaut
    //const skip = req.query.skip || 0; // Si 'skip' n'est pas spécifié dans l'URL, ne pas sauter d'articles par défaut

    // Logique pour récupérer les articles à partir de la base de données
    // Dans cet exemple, une simple chaîne de caractères est renvoyée comme réponse,
    // indiquant le nombre d'articles à récupérer et à partir de quelle position
   // res.send(Récupérer ${take} articles à partir de la position ${skip}.);
//});
router.post('/', async (req, res) => {
    const { title, content, image, published, userId, categoryIds } = req.body;

    // Vérifier si l'utilisateur existe
    const userExists = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!userExists) {
        return res.status(404).send('User not found.');
    }

   

    try {
        const newArticle = await prisma.article.create({
            data: {
                title,
                content,
                image,
                published,
                userId,
                categories: {
                    connect: categoryIds.map(id => ({ id }))
                }
            }
        });
        res.status(201).json(newArticle);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).send("Unable to create article due to an unexpected error.");
    }
});









//router.post('/', (req, res) => {
    //const { title } = req.body;
    
    //console.log(req.body);
    //res.send('Ajouter un nouvel article.');
//});

//router.get('/', async (req, res) => {
    //try {
      //const articles = await prisma.article.findMany();
      //res.json(articles);
   // } catch (error) {
     // res.status(500).send(error.message);
   // }
 // });
  



// Supprimer l'article ayant l'id donné


router.delete('/:id', async (req, res) => {
    const articleId = parseInt(req.params.id); // Convertir l'ID de l'article en nombre

    try {
        const article = await prisma.article.findUnique({
            where: { id: articleId }
        });

        if (!article) {
            return res.status(404).send('Article not found.');
        }

        await prisma.article.delete({
            where: { id: articleId }
        });

        res.send(`Article with ID ${articleId} has been deleted.`);
    } catch (error) {
        console.error("Failed to delete article:", error);
        res.status(500).send(`Unable to delete article.`);
    }
});
//router.delete('/:id', (req, res) => {
    //const articleId = req.params.id;

   
    //res.send(Supprimer l'article avec l'ID ${articleId}.);
//});

// Mettre à jour l'article envoyé dans le corps de la requête
router.patch('/:id', async (req, res) => {
    const articleId = parseInt(req.params.id); // Récupérer l'ID de l'article à partir des paramètres de l'URL
    const { title, content, image, published, userId, categoryIds } = req.body;


    try {
        const article = await prisma.article.findUnique({
            where: { id: articleId }
        });

        if (!article) {
            return res.status(404).send(`Article not found.`);
        }

        const updatedArticle = await prisma.article.update({
            where: { id: articleId },
            data: {
                title,       // Mise à jour du titre, si fourni
                content,     // Mise à jour du contenu, si fourni
                image,       // Mise à jour de l'image, si fournie
                updatedAt: updatedAt ? new Date(updatedAt) : undefined, // Mise à jour de la date de modification, si fournie
                published ,  // Mise à jour du statut de publication, si fourni
                userId,
                categories: {
                    connect: categoryIds.map(id => ({ id }))
                }
            }
        });

        res.json(updatedArticle);
    } catch (error) {
        console.error("Failed to update article:", error);
        res.status(500).send(`Unable to update article.`);
    }
});

//router.patch('/', (req, res) => {
   
    //res.send('Mettre à jour un article.');
//});

module.exports = router;