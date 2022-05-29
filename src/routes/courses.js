const express = require('express');
const router = express.Router();
const course_controller = require('../app/controllers/CourseController');
router.get('/create', course_controller.create);
router.post('/store', course_controller.store);
router.get('/edit/:slug', course_controller.edit);
router.post('/update/:id', course_controller.update);
router.get('/delete/:id', course_controller.delete);
module.exports = router;
