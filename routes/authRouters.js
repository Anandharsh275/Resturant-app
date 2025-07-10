const express=require('express')
const router = express.Router();
const {registerController}=require("../controllers/authcontrollers")
const {loginController}=require("../controllers/authcontrollers")
// const mongoose = require('mongoose');
//routes
//REGISTER||POST
router.post("/register",registerController)


//LOGIN || POST
router.post("/login",loginController);
module.exports=router;