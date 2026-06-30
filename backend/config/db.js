const mongoose =require('mongoose');
const colors=require('colors');
//function mongodb dfatabase connection 
const connectDB=async()=>{
    try{
        console.log("Connecting to primary database...".cyan);
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database: ${mongoose.connection.host}`.bgCyan);
    }
    catch(error){
        console.log("Primary DB connection error, trying local fallback...".yellow);
        try {
            const localUri = "mongodb://127.0.0.1:27017/food-app";
            await mongoose.connect(localUri);
            console.log(`Connected to Local Fallback Database: ${mongoose.connection.host}`.bgCyan);
        } catch (localError) {
            console.log("Local database fallback failed as well.".red);
            throw error;
        }
    }
};
module.exports=connectDB;