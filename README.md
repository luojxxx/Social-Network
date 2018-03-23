# Geddit - Online Community

##Repo Structure
- The top level folder contains all the backend files. This is to facilitate Github integration with Heroku or AWS.
- One of the top level folders is the frontend folder. This contains all the frontend source code.

##Run your own copy
1. Download/clone repo
2. Using command line interface (CLI) from top-level folder run: ```npm install```
3. The backend will require these environment variables:
 - STAGE (either 'development' to report errors or anything else to not)
 - OAUTH\_SERVER\_CALLBACK_URL (the server's hostname like http://localhost:3000)
 - OAUTH\_CLIENT\_CALLBACK_URL (the frontend's hostname like http://localhost:3001)
 - GOOGLE\_CLIENT\_ID (google api client ID)
 - GOOGLE\_CLIENT\_SECRET (google api client secret)
 - DATABASE_STRING (the database connection string)
 - EXPRESS\_SESSIONS\_SECRET (some secret string)
 - CORS (the url of the frontend)
4. Then run ```nodemon``` to start running the server locally (if nodemon isn't installed, follow instructions here [nodemon](https://www.npmjs.com/package/nodemon))
5. Now in a new CLI, navigate to frontend folder and run: 
```npm install```
6. Then while in the frontend folder, run either:
 - ```npm run start``` to run the frontend locally
 - ```npm run build``` to generate the bundled html, css, and javascript to deploy online