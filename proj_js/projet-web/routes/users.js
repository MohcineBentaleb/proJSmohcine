// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/:id', function(req, res, next) {
//   const userId = req.params.id;
//   res.send(`article ${userId}`);
// });

// module.exports = router;

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
   res.send(`Réponse depuis le routeur`);
});



router.get('/:id', (req, res) => {
    const userId = req.params.id;

    
    res.send(`Récupérer l'article avec l'ID ${userId}.`);
});

router.delete('/:id', (req, res) => {
    const userId = req.params.id;

    
    res.send(`Supprimer l'article avec l'ID ${userId}.`);
});

router.patch('/', (req, res) => {
    
    res.send(`Mettre à jour un user`);
});

module.exports = router;