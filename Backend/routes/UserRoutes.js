const express=require('express')
const router=express.Router()
const {registerUser,loginUser,userDetails,logout} =require('../controllers/UserController')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/user-details',userDetails)
router.get('/logout',logout)
module.exports=router
