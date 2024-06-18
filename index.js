const cors =require("cors");
const express = require("express")
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const app =express();

dotenv.config({
    path : "./.env", 
})

app.use(cors());
app.use(bodyParser.json());


app.listen(process.env.PORT || 8000 , ()=>{
    console.log("Server Running")
})