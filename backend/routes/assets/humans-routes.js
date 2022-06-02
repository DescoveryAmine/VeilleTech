const express = require('express');

const humansController = require('../../controllers/humans-controllers');

const router = express.Router();


router.get('/all',humansController.findInactive);

router.post('/activate',humansController.activate);

router.post('/reject',humansController.reject);

router.post('/erase',humansController.erase);

// router.post('/filter', humansController.findbydomain);

module.exports = router;
