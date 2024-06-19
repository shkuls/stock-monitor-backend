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

app.use(cors());
app.use(bodyParser.json());



app.get("/getAccessToken" , (req,res)=>{
    
    res.redirect(`https://api.upstox.com/v2/login/authorization/dialog?client_id=81119962-dd1c-4422-a44d-26c566b51a08&redirect_uri=http://localhost:8000/redirect`) //allows the user to login and redirects to to redirect_uri as provided in the upstox app

})

app.get("/redirect*" , (req,res)=>{

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
  
  localStorage.setItem('upstox_token', `${response.data.access_token}`); 
  
})
.catch((error) => {
  console.log(error);
});


res.send("login successfull , you can close the tab now")




})


app.listen(process.env.PORT || 8000 , ()=>{
    console.log("Server Running")
})