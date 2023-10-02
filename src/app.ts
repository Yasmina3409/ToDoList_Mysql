import express from 'express';
import myDataSource from "./config/bd";
import dotenv from 'dotenv';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger_output.json'
import swaggerAutogen from 'swagger-autogen';
import cors from 'cors';
import bodyParser from 'body-parser';
import routerUser from "./routes/userRoutes";
import routerTask from "./routes/taskRoutes";

dotenv.config();

// Connexion à la DB
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

    const outputFile = './swagger_output.json'
    swaggerAutogen(outputFile, ['../src/app.ts'])

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//const outputFile = './swagger_output.json';


app.use(cors());
app.use("/", routerUser);
app.use("/task", routerTask);


app.listen(8000, () => {
  console.log(`Le serveur est en écoute sur le port 8000`);
});




































// const express = require('express');
// const connectDB = require("./config/bd");
// // const session = require('express-session');
// require("dotenv").config();
// var cors = require('cors');
// const bodyParser = require('body-parser');
// // connexion à la DB
// connectDB();
// const app = express();
// // const userRouter= require('./routes/userRoutes')
// // const routerTask=require("./routes/taskRoutes")
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// // const swaggerUi = require('swagger-ui-express');
// // const swaggerAutogen = require('swagger-autogen');

// const outputFile = './swagger_output.json'
// //  swaggerAutogen(outputFile, ['./app.js'])//
// //const swaggerDocument = require('./swagger_output.json');
// //app.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// app.use(cors());


// // app.use("/task", routerTask);
// // app.use("/", userRouter)

// app.listen(8000, () => {
//     console.log(`Le serveur est en écoute sur le port 8000`);
// });

