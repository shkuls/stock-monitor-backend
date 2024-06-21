const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require('path')
const app = express();
const axios = require("axios");
const qs = require("qs");
dotenv.config({
  path: "./.env",
});
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(cors());

var access_token = null;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_url = process.env.REDIRECT_URL;

app.get("/" ,(req,res)=>{
  res.sendFile("./welcome.html" ,{root: __dirname });
} )

app.get("/login", (req, res) => {
  res.redirect((`https://api.upstox.com/v2/login/authorization/dialog?client_id=${client_id}&redirect_uri=` + redirect_url)
    
  ); //allows the user to login and redirects to to redirect_uri as provided in the upstox app
});

app.get("/redirect*", (req, res) => {
  if (req.query.code) {
    const authCode = req.query.code;
    const data = {
      client_id: `${client_id}`,
      client_secret: `${client_secret}`,
      code: `${authCode}`,
      redirect_uri: `${redirect_url}`,
      grant_type: "authorization_code",
    };
    const url = "https://api.upstox.com/v2/login/authorization/token";
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
    };
    axios
      .post(url, qs.stringify(data), config)
      .then((response) => {
        access_token = response.data.access_token;
        isLoggedin = true;
        res.sendFile("./success.html" ,{root: __dirname });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.send("404 Invalid request");
  }
});

app.get("/getLogin", (req, res) => {
  res.send(access_token);
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server Running");
});
