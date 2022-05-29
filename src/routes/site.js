const express = require('express');
const router = express.Router();
const sitecontroller = require('../app/controllers/SiteController');
router.use('/search', sitecontroller.search);
router.get('/:slug', sitecontroller.appear)
router.use('/', sitecontroller.index);
module.exports = router;
