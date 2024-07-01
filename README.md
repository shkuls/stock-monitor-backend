
# STOCK MONITOR CHROME EXTENSION - BACKEND

This is the backend for the Stock Monitor Chrome Extension.

Github repository for the Extension : https://github.com/shkuls/upstox-monitor




## SETUP


1. Create an App on Upstox in your account settings: 

        a.Go to My Account on https://pro.upstox.com/

        b.Click on Apps in the topbar.

        c.Create a new app.
        Redirect Url should be your Backend host +'/redirect'
        Example - http://localhost:8000/redirect
        

        d.Get the Client ID and Secret and create a .env file of the following format -
    
        PORT=8000
        CORS_ORIGIN=*

        CLIENT_ID=
        CLIENT_SECRET=

        REDIRECT_URL=


2. Host the repository on Vercel or localhost: 

   ```
   Don't Forget to set the REDIRECT_URL in the Backend and NEXT_PUBLIC_BACKEND_HOST in .env.local of the frontend.
   ```

   


## Usage

### On Localhost

1. Install packages:

```
npm init
npm install
```
2. Run the application
 ```
 node index.js

 ```


### On Vercel

Depoloy this repostitory on Vercel and set up the environmental variables correctly and you are all set!


