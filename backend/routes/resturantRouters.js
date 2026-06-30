const express=require("express")
const authMiddleware=require("../middleware/authMiddleware");
const router =express.Router();
const {createResturant, getAllResturantController, getResturantByIdController, deleteResturantController}=require("../controllers/resturantcontroller")
// //routes
router.post("/create",authMiddleware,createResturant);
// GET ALL RESTURANTS || GET
router.get("/getall",getAllResturantController);
// GET RESTURANT BY ID || GET
router.get("/get/:id",getResturantByIdController);
//DELETE RESTURANT
router.delete("/delete/:id",authMiddleware,deleteResturantController);

module.exports=router