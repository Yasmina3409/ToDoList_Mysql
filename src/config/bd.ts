import { DataSource , EntityRepository }  from 'typeorm';
import * as dotenv from 'dotenv';
 import { User } from "../entities/User";
// import { Task } from "../entities/Task";
// import { Client } from '../entities/Client';
// import { Banker } from '../entities/Banker';
dotenv.config();

const myDataSource = new DataSource({
  
     
      type: 'mysql', // Vous avez commenté cette ligne, mais elle est nécessaire pour spécifier le type de base de données
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      
      entities: ["./src/Entities/**/*.ts"], // Laissez la liste des entités vide pour le moment
      synchronize: true,

// À des fins de développement uniquement
    });

    @EntityRepository(User) // Décorateur pour votre entité User
    export class UserRepository {}

export default myDataSource;

// import { createConnection } from 'typeorm';
// //  import { User } from "./entity/User";
// //  import express from 'express';
//  import * as dotenv from `dotenv`;
//  dotenv.config();
// //  const dotenv = require('dotenv');

// const connectDB = async () => {
//     try {
//        await createConnection({
// 		// type: 'mysql',
//   host: process.env.DB_HOST,

//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: [ ], // Laissez la liste des entités vide pour le moment
//   synchronize: true, // À des fins de développement uniquement
//         });
   
// 		console.log('Connected to BDD mysql with typeOrm');
//      }
// catch (err) {      console.error(error);
// 		throw new Error('Unable to connect to db');
//   }

// }
// module.exports = connectDB;