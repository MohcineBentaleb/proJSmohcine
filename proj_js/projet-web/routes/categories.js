const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

router.get('/', async (req, res) => {
    // Récupération des paramètres de requête 'take' et 'skip' de l'URL
    const take = parseInt(req.query.take) || 10; // Si 'take' n'est pas spécifié dans l'URL, prendre 10 articles par défaut
    const skip = parseInt(req.query.skip) || 0; // Si 'skip' n'est pas spécifié dans l'URL, ne pas sauter d'articles par défaut

    try {
        // Logique pour récupérer les catégories à partir de la base de données avec les articles associés
        const categories = await prisma.category.findMany({
            take: take,
            skip: skip,
            include: { articles: true } // Inclure les articles associés à chaque catégorie
        });
        res.json(categories); // Envoyer les catégories récupérées au client en format JSON avec les articles associés
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        res.status(500).send(`Unable to fetch categories.`);
    }
});


router.get('/:id', async (req, res) => {
    const categoryId = parseInt(req.params.id); // Convertir l'ID de la catégorie en nombre

    try {
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
            include: { articles: true } // Inclure les articles associés à la catégorie
        });

        if (!category) {
            return res.status(404).send('Category not found.');
        }

        res.json(category); // Envoyer la catégorie récupérée en réponse avec les articles associés
    } catch (error) {
        console.error("Failed to fetch category:", error);
        res.status(500).send(`Unable to fetch category.`);
    }
});









router.delete('/:id', async (req, res) => {
    const categoryId = parseInt(req.params.id); // Convertir l'ID de la catégorie en nombre

    try {
        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!category) {
            return res.status(404).send(`Category not found.`); // Gérer le cas où la catégorie n'existe pas
        }

        await prisma.category.delete({
            where: { id: categoryId }
        });

        res.send(`Category with ID ${categoryId} has been deleted.`); // Confirmation de la suppression
    } catch (error) {
        console.error("Failed to delete category:", error);
        res.status(500).send(`Unable to delete category.`); // Gérer les erreurs potentielles
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;

    try {
        // Créer une nouvelle catégorie
        const newCategory = await prisma.category.create({
            data: {
                name
            }
        });

        res.status(201).json(newCategory); // Renvoyer la nouvelle catégorie créée
    } catch (error) {
        console.error('Error creating category:', error);
        if (error.meta && error.meta.cause) {
            res.status(500).send(`Unable to create category: ${error.meta.cause}`);
        } else {
            res.status(500).send(`Unable to create category due to an unexpected error.`);
        }
    }
});

router.patch('/:id', async (req, res) => {
    const categoryId = parseInt(req.params.id); // Convertir l'ID de la catégorie en nombre entier
    const { name } = req.body; // Récupérer le nouveau nom de la catégorie depuis le corps de la requête

    try {
        // Mettre à jour la catégorie dans la base de données
        const updatedCategory = await prisma.category.update({
            where: { id: categoryId }, // Identifier la catégorie à mettre à jour par son ID
            data: {
                name: name // Mettre à jour le nom de la catégorie avec le nouveau nom fourni
            }
        });

        res.json(updatedCategory); // Renvoyer la catégorie mise à jour en réponse
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send(`Unable to update category due to an unexpected error.`);
    }
});



module.exports = router;