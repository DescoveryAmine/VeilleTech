const express = require('express');
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/news-fields', (req, res) => res.json({ msg: 'simple Works' }));

module.exports = router;