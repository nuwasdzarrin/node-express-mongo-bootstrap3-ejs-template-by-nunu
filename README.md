# NodeJS-Express-Mongo-Bootstrap3-ejs-template-By-Nunu
Template made for those who are starting in NodeJS.It was used: express, mongo, bootstrap and ejs. To run the project, follow these steps: 

1 - Install NodeJS min node v16; 
2 - Install MongoDB v6 or v7 and keep it running;
3 - init mongo database using "mongosh" to open mode shell of mongo
4 - use command "show dbs;" to show all database in your mongodb;
5 - create database using command "use example_db", system will show switch to example_db. Databse not actually created you must fill collection and document at least one
6 - insert random document to example_db using command "db.first_collection.insert({"name": "john"})". After insert success the "example_db" is permanent created
7 - Go to the project root directory;
8 - Set env MONGO_URL with mongodb://localhost/{name of your database on step 5}
8 - Run the command "yarn install";
9 - Run the command "yarn start"; nodemon will start app.js and will initialize user collection with document "admin"
10 - Open the browser address "http://localhost:3005/"; 
11 - Login: admin, password: 123456;  

The project already has with login session, logout, register and list users.
