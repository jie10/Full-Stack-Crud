# Full-Stack-Crud
This is Vue and Node(express) Full Stack App


# Server

### Database
MongoDB // use to store data

### ODM
Mongoose // use to connect to the database and create schema

### API
REST API 

### Server Routes
localhost:3002/api/v1/crud

### How to start the project?
#### go to server side folder
```
cd server // this will go to the server side
```
#### create a new .env file
```
touch .env // this will create a new .env file
```
#### add the following lines
```
MONGO_URI=mongodb://localhost:27017/ // this is the mongodb uri if localhost is not working then use "127.0.0.1:27017"
PORT=3002 // this is the port where the server is running
```
#### install dependencies
```
npm install || pnpm install
```
#### run the server
```
npm run dev || pnpm run dev // this will run the server
```