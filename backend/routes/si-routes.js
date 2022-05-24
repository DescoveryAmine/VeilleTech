const express = require('express');

const SIControllers = require('../controllers/si-controllers');

const router = express.Router();

router.get('/', SIControllers.getArticlesByDate);


router.get('/uid', SIControllers.getArticlesByUserId);

//router.delete('/:pid', SIControllers.deletePlace);

module.exports = router;
