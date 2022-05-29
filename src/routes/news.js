const express = require('express');
const router = express.Router();
const news_controller = require('../app/controllers/NewsController');
router.use('/:slug', news_controller.show);
router.use('/', news_controller.index);
module.exports = router;
