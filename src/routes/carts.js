const express = require('express');
const router = express.Router();
const cart_controller = require('../app/controllers/CartController');
router.get('/',cart_controller.index)
router.get('/cart/:slug',cart_controller.cart)
router.get('/cartTable',cart_controller.cartTable)
router.post('/updateQ/:slug',cart_controller.updateQ)
router.get('/cartDelete/:id',cart_controller.cartDelete)

module.exports = router;