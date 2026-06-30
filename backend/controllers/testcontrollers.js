const testUserController=(req,res)=>{
    try{
        res.status(200).send({
            success:true,
            message:"test User Data API"
        })
    }catch(error){
        console.log("error in Test API",error);
    }
}

module.exports = { testUserController }