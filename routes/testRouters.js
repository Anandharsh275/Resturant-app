const express=require("express");
const { testUserController } = require("../controllers/testcontrollers");

//router object
const router=express.Router();

//route GET| POST | UPDATE | DELETE
router.get('/test-user',testUserController)

//export
module.exports=router