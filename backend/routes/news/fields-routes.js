const express = require('express');

const FControllers = require('../../controllers/fields-controllers');

const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/', FControllers.getArticlesByFields);

router.get('/uid', FControllers.getArticlesByUserId);

module.exports = router;