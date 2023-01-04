const router = require('express').Router();
const cartController = require('../app/controller/cart.controller');
const { auth } = require('../app/middlewares/auth.middlewares');

router.post('/createcart', auth, cartController.createCart);
router.post('/additem/:itemId', auth, cartController.addToCart);
router.delete('/dropitem/:itemId', auth, cartController.dropFromCart);
router.get('/viewcart', auth, cartController.viewCart);

module.exports = router;
