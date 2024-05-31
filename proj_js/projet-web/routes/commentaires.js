const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    
    const take = req.query.take || 10;
    const skip = req.query.skip || 0; 

    res.send(`Récupérer ${take} commentaire à partir de la position ${skip}.`);
});


router.get('/', (req, res) => {
   res.send('Réponse depuis le routeur');
});

router.get('/:id', (req, res) => {
    const commentaireId = req.params.id;

    // Logique pour récupérer l'article avec l'ID donné depuis la base de données
    res.send(`Récupérer commentaire avec l'ID ${commentaireId}.`);
});


router.post('/', (req, res) => {
   
    res.send(`Ajouter un nouvel commentaire.`);
});


router.patch('/', (req, res) => {
    // Logique pour mettre à jour l'article dans la base de données
    res.send(`Mettre à jour un commentaire`);
});


router.delete('/:id', (req, res) => {
    const commentaireId = req.params.id;

    // Logique pour supprimer l'article avec l'ID donné de la base de données
    res.send(`Supprimer commentaire avec l'ID ${commentaireId}.`);
});

module.exports = router;