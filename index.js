const cors =require("cors");
const express = require("express")
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const app =express();
const axios = require('axios');
const qs = require('qs');
dotenv.config({
    path : "./.env", 
})

// app.use(cors());
app.use(bodyParser.json());
app.use(cors())

var access_token = null;
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET



app.get("/login" , (req,res)=>{
    
    res.redirect(`https://api.upstox.com/v2/login/authorization/dialog?client_id=${client_id}&redirect_uri=http://localhost:8000/redirect`) //allows the user to login and redirects to to redirect_uri as provided in the upstox app

})

app.get("/redirect*" , (req,res)=>{
    if(req.query.code){

      const authCode = req.query.code; 
      const data={
          client_id: "81119962-dd1c-4422-a44d-26c566b51a08" ,
  client_secret: "4i5qrjv19v" , 
  code: `${authCode}` , 
  redirect_uri: "http://localhost:8000/redirect",
  grant_type: "authorization_code"
  }
  const url = 'https://api.upstox.com/v2/login/authorization/token'
      let config = {
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 
            'Accept': 'application/json'
          }
        };
        axios.post(url , qs.stringify(data) , config)
  .then((response) => {
    
    access_token = response.data.access_token;
    res.send("you have been logged in! , open the extension from the top")
    
    
  })
  .catch((error) => {
    console.log(error);
  }
  );
      
    }
    else
    {
      res.send("404 Invalid request")
    }



})

app.get("/getAccess" , (req,res)=>{
  //I need to ensure that not everyone can acccess this route - set 
  // if(req.body.pwd === process.env.ACCESS_PWD)
  // console.log(access_token)
  res.send(access_token);
  // else
  // res.send("Invalid access pwd");
})






app.listen(process.env.PORT || 8000 , ()=>{
    console.log("Server Running")
})