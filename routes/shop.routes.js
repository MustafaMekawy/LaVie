const router=require("express").Router()
const ShopController=require("../app/controller/shop.controller")
const {auth,restrictoTo}=require("../app/middlewares/auth.middlewares")
router.post("/createShop",auth,restrictoTo('professional'),ShopController.createShop)
router.get("/GetShop/:id",auth,ShopController.GetShop)
router.get("/GetAllShops",auth,ShopController.GetAllShop)
router.patch("/editShop/:id",auth,restrictoTo('professional'),ShopController.editShop)
router.delete("/deleteShop/:id",auth,restrictoTo('professional'),ShopController.deletShop)
module.exports=router