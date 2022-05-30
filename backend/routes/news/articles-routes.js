const express = require('express');

const FControllers = require('../../controllers/articles-controllers');

const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/', FControllers.getArticles);

router.get('/uid', FControllers.getArticlesByUserId);

module.exports = router;