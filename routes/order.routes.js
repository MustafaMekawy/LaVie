const router = require('express').Router();
const orderController = require('../app/controller/order.controller');
const { auth } = require('../app/middlewares/auth.middlewares');

router.post('/plcacitems', auth, orderController.plcacItems);
router.get('/confirmorder/:orderid',auth,orderController.confirmOrder);
router.post('/orderdetails/:orderid',auth,orderController.orderDetails);
router.post('/confirmcode/:orderid',auth,orderController.confirmCode);
router.get('/myorders',auth,orderController.myOrders);


module.exports = router;
