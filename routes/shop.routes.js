const router=require("express").Router()
const ShopController=require("../app/controller/shop.controller")
const {auth}=require("../app/middlewares/auth.middlewares")
router.post("/createShop",auth,ShopController.createShop)
router.get("/GetShop/:id",auth,ShopController.GetShop)
router.get("/GetAllShops",auth,ShopController.GetAllShop)
router.patch("/editShop/:id",auth,ShopController.editShop)
router.delete("/deleteShop/:id",auth,ShopController.deletShop)
module.exports=router