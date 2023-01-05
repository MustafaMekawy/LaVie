const router = require('express').Router();
const PlantController = require('../app/controller/plant.controller');
const { auth ,restrictoTo} = require('../app/middlewares/auth.middlewares');
router.post('/createPlant', auth,restrictoTo('professional'), PlantController.createPlant);
router.get('/GetPlant/:id', auth, PlantController.Getplant);
router.get('/GetAllPlants', auth, PlantController.GetAllPlants);
router.patch('/editPlant/:id', auth,restrictoTo('professional'), PlantController.editPlant);
router.delete('/deletePlant/:id',auth,restrictoTo('professional'),PlantController.deletShop);
router.post('/addreview/:id', auth, PlantController.addReview);
router.get('/allreviews/:id', auth, PlantController.allReviews);

module.exports = router;
