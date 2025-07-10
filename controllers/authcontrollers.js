const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//REGISTER
const registerController = async(req,res)=>{
try{
   const {username,email,password,phone,address,answer}=req.body;

   if(!username||!email||!password||!address||!phone||!answer){
    return res.status(500).send({
        success:false,
        message:'please provide All fields',
    })
   }
   //check user
   const existingUser=await userModel.findOne({email});
   if(existingUser){
    return res.status(500).send({
        success:false,
        message:'user already Registered',
    });
   }
   //hash password
   var salt=bcrypt.genSaltSync(10);
   const hashedpassword=await bcrypt.hash(password,salt);
   //Create new user
   const user = await userModel.create({username,email,password:hashedpassword,address,phone,answer});
   res.status(201).send({
    success:true,
    message:'Successfully Registered',
    user,
   });
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error In Register API',
        error
})
}
};

// LOGIN 
const loginController =async (req,res)=>{
    try{
        const {email,password}=req.body;
        //validfatuion
    if(!email||!password){
        return res.status(500).send({
            success:false,
            message:'please provide email and password both',
        });
    }
    //check user
    const user=await userModel.findOne({email});
    if(!user){
        return res.status(404).send({
            success:false,
            message:'User email is  not founded'
        });
    }
    
    const isMatch=await bcrypt.compare(password,user.password);
    //  console.log(is)
   if(!isMatch){
        return res.status(500).send({
            success:false,
            message:"password is not correct"
        })
    }
    // token
    // for encryption use sign and for decrypt use verify
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,
    {expiresIn:"7d",        
});
user.password=undefined;
    res.status(200).send({
        success:true,
        message:"Login Successfully",
        user,
        token,
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Login API",
            error,
        })
    }
}
module.exports={registerController,loginController}