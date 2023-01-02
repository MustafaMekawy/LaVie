const express = require('express')
const userController = require('../app/controller/user.controller')
const {auth,restrictoTo} = require('../app/middlewares/auth.middlewares')

const router = express.Router()

router.post('/signup', userController.signUp)
router.post('/login', userController.login)

router.get('/showallusers',auth,restrictoTo('admin'),userController.showAllUsers)
router.get('/assignadmin/:id',auth,restrictoTo('admin'),userController.assignAdmin)

router.patch('/changePassword',auth,userController.changePassword)
router.post('/forgetPassword',auth,userController.forgetPassword)
router.post('/resetpassword/:token',auth,userController.resetpassword)

router.get('/profile',auth,userController.profile)
router.patch('/editprofile',auth,userController.editprofile)
router.delete('/deleteaccount',auth,userController.deleteaccount)
router.post('/chooseCategory',auth,userController.chooseCategory)
router.get('/LearnMore',auth,userController.LearnMore)
router.get('/contactUS',auth,userController.ContactUS)
router.get('/logout',auth,userController.Logout)


module.exports = router;
