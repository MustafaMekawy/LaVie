const router = require('express').Router();
const PlantController = require('../app/controller/plant.controller');
const { auth } = require('../app/middlewares/auth.middlewares');
router.post('/createPlant', auth, PlantController.createPlant);
router.get('/GetPlant/:id', auth, PlantController.Getplant);
router.get('/GetAllPlants', auth, PlantController.GetAllPlants);
router.patch('/editPlant/:id', auth, PlantController.editPlant);
router.delete('/deletePlant/:id', auth, PlantController.deletShop);
router.post('/addreview/:id', auth, PlantController.addReview);
router.get('/allreviews/:id', auth, PlantController.allReviews);

module.exports = router;
