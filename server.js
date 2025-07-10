const express=require("express");
const colors=require("colors");
const cors=require("cors");
const morgan=require("morgan")
const dotenv=require("dotenv");
const connectDB=require("./config/db");
// dot ev configuration
dotenv.config()

//DB connection 
connectDB()

// first of all we will create server of express
// now we will create rest object
const app=express();
// here we create the object naming app now all the functionality of express is in app object also

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//now create route 
app.use('/api/v1/test',require('./routes/testRouters'));
//authentication route
app.use('/api/v1/auth',require('./routes/authRouters'));
//user router
app.use('/api/v1/user',require("./routes/userRouters"));
//resturant route
app.use('/api/v1/resturant',require("./routes/resturantRouters"));
//category route
app.use('/api/v1/category',require("./routes/categoryRouters"));
//food route
app.use('/api/v1/food',require("./routes/foodRouters"))
//URL -> http://localhost:8080 
// if we have only slash then upper url will be assumed and we can write further slash to add something to the url also
app.get("/",(req,res)=>{
    // we are using arrow function in will two paramenter are taken one req and one res
    return res.status(200).send("<h1>Welcome to the food server</h1>");
});
// port 
// for running the server we need to it to listen

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is Running on http://localhost:${PORT}`.white.bgMagenta);
});
