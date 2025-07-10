const mongoose =require('mongoose');
const colors=require('colors');
//function mongodb dfatabase connection 
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database${mongoose.connection.host}`.bgCyan);
    }
    catch(error){
        console.log("DB error",error.bgRed)
    }
};
module.exports=connectDB;