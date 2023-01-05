const router = require('express').Router();
const ComunityController = require('../app/controller/comunity.controller');
const { auth, restrictoTo } = require('../app/middlewares/auth.middlewares');

router.post('/createcomunity', auth, restrictoTo('admin'), ComunityController.createComunity);
module.exports = router;
