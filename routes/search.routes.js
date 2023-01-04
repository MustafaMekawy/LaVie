const router = require('express').Router();
const searchController = require('../app/controller/search.controller');
const { auth } = require('../app/middlewares/auth.middlewares');

router.get('/', searchController.search);
module.exports = router;
