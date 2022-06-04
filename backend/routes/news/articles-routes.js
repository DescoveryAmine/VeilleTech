const express = require('express');

const AControllers = require('../../controllers/articles-controllers');

const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/', AControllers.getArticles);

router.post('/updateOne', AControllers.updateArticlesById);

router.get('/uid', AControllers.getArticlesByUserId);

module.exports = router;