const userModel=require("../models/userModel");
const bcrypt = require('bcryptjs');
//GET USER INFO
const getUserController = async (req,res) => {
    try{
        //find user
        const user= await userModel.findById({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        //hide password
        user.password=undefined;
        //send response
        // console.log("harsh");
        res.status(200).send({
            success:true,
            message:"User found",
            user
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"hello,Error in Get User API",
            error
        })
    }
};
//UPDATE USER
const updateUserController = async(req,res) => {
    try{
        const user = await userModel.findById(req.body.id)
        //validation
        if(!user){
            return res.status(400).send({
                success:false,
                message:"user not found"
            })
        }
        //update 
        const {username,address,phone}=req.body;

        // console.log("before update",user.username,user.address,user.phone)
        // user.username="harshchange"
        if(username){
            user.username=username;
            console.log("updated username",username);
        }
        if(address){
            user.address=address;
            console.log("updated address",address);
        }
        if(phone){
            user.phone=phone
            console.log("updated phone",phone);
        }
        //save user
        // console.log("fksss");
        await user.save();
        const updatedUser = await userModel.findById({ _id: req.body.id });
        console.log("after update",username,address,phone);    
        res.status(200).send({
            success:true,
            message:"user updated successfully",
            updatedUser,
            
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in update user API",
            error
        })
    }
}
const resetPasswordController=async(req,res)=>{
try{
const {email,newpassword,answer}=req.body;
if(!email||!newpassword||!answer){
    return res.status(500).send({
        success:false,
        message:"Please provide All fields"
    })
}
const user = await userModel.findOne({email,answer});
if(!user){
    return res.status(500).send({
        success:false,
        message:"user not found or invalid answer"
    })
}
//hashing password
var salt=bcrypt.genSaltSync(10);
const hashedpassword=await bcrypt.hash(newpassword,salt);
user.password=hashedpassword;
await user.save();
res.status(200).send({
    success:true,
    message:"password reset successfully",
    user
});
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in PASSWORD RESET API",
        error
    })
}
};
//UPDATE USER PASSWORD
const updatePasswordController=async (req,res)=>{
    try{
        const user=await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not Found"
            })
        }
        //get data from user
        const {oldpassword,newpassword}=req.body
        if(!oldpassword||!newpassword){
            return res.status(500).send({
                success:false,
                message:"Please provide old or new password",
            })
        }
        //check user password | compare password
        const isMatch = await bcrypt.compare(oldpassword,user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message: "Invalid Credentials",
            });
        }
        var salt=bcrypt.genSaltSync(10);
        const hashedpassword=await bcrypt.hash(newpassword,salt);
        user.password=hashedpassword;
        await user.save()
        res.status(200).send({
            success:true,
            message:"password updated!",
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Password update API",
            error
        })
    }
};
//DELETE PROFILE 
const deleteProfileController=async (req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Your account has been deleted",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Delete Profile API",
            error
        })
    }
};
module.exports = {getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteProfileController}