const express=require('express');
const { getUserController, deleteProfileController,updateUserController,resetPasswordController,updatePasswordController } = require('../controllers/usercontroller');
const authMiddleware =require('../middleware/authMiddleware')
const router = express.Router();

//GET USER|| GET
router.get("/getUser",authMiddleware,getUserController);
//UPDATE PROFILE
router.put("/updateuser",authMiddleware,updateUserController);
//PASSWORD UPDATE
router.post("/updatepassword",authMiddleware,updatePasswordController)
//RESET PASSWORD
router.post("/resetpassword",authMiddleware,resetPasswordController);
//DELETE USER
router.delete('/deleteuser/:id',authMiddleware,deleteProfileController)
module.exports=router;