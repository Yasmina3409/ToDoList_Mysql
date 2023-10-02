







import { Request, Response } from "express";
import argon2 from "argon2";
import { generateAccessToken } from "../authJWT";
import jwt from 'jsonwebtoken';
import { User } from "../entities/User";
import { Task } from "../entities/Task";
import myDataSource from "../config/bd"
export const createUser = async (req: Request, res: Response) => {
      // #swagger.tags = ['users']
      // #swagger.description = 'Endpoint to create a new user.'
      // #swagger.summary = 'Create a new user'
      // #swagger.parameters['user'] = { description: 'User object', required: true, type: 'object'}
  try {
    const userRepository = myDataSource.getRepository(User);

    // Affichez le contenu de req.body pour le débogage
    console.log("req.body:", req.body);
    const hash = await argon2.hash(req.body.password);
    console.log(hash)
    req.body.password= hash;
    // Créez un nouvel utilisateur à partir de req.body
    const user = userRepository.create(req.body);

    // Affichez l'utilisateur créé pour le débogage
    console.log("user:", user);

    // Enregistrez l'utilisateur dans la base de données
    await userRepository.save(user);

    return res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur :", err);

    return res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: err.message });
  }
};
export const connectUser = async (req: Request, res: Response) => {
  // #swagger.tags = ['Security']
  // #swagger.summary = 'Get authentication token'
  // #swagger.description = 'Endpoint to authenticate a user and return a JWT token'
      const userRepository = myDataSource.getRepository(User);
      const { username, password } = req.body;
      console.log(username)
  try {
    // Recherchez l'utilisateur par nom d'utilisateur
    const user = await userRepository.findOneBy({username:username});
    console.log(user)
          if (user) {
              // Vérifiez le mot de passe avec argon2
              const isPasswordValid = await argon2.verify(user.password, password);
  
              if (isPasswordValid) {
               ;
                  //Générez un jeton d'accès ici
                  const token = generateAccessToken(user.username , user.id.toString() );
                  const decoded = jwt.decode(token);
                  console.log(decoded)
                  //  res.status(200).json(token);
                  return res.status(201).json({ message: "Utilisateur connceter avec succès", token })
                  
              } else {
                  res.status(400).json({ message: "Mauvais mot de passe !" });
              }
          } else {
              res.status(404).json({ message: "Utilisateur non trouvé" });
          }
      } catch (err) {
          res.status(500).json({ message: "Erreur lors de la connexion : " + err.message });
      }
  }
export const getUser = async (req: Request, res: Response) => {
      
      const userRepository = myDataSource.getRepository(User);
      const { username, password } = req.body;
      console.log(username)
  try {
    // Recherchez l'utilisateur par nom d'utilisateur
    
    // const user = await userRepository.findOne({where: {username  : username }});
    const user = await userRepository.find({relations: { tasks: true }});
    console.log(user)
    return res.status(201).json({ message: "Utilisateur connceter avec succès", user });
         
      } catch (err) {
          res.status(500).json({ message: "Erreur lors de la connexion : " + err.message });
      }
  }
  














// import { Request, Response } from "express";
// import argon2  from "argon2";
// import { User } from "../entities/User";


// // interface UserBody {
// //   firstname: string;
// //   lastname: string;
// // }


// // export const createUser = async (
// //     req: Request<unknown, unknown>,
// //     res: Response
// //   ) => {
// //     // const { username, email, password } = req.body;
// //     const user = new User();
// //    console.log(user)
// //     await user.save();
// //     return res.json(user);
// //   };
// export const createUser = async( req: Request<unknown, unknown>,
//        res: Response) =>
//        {
//     // #swagger.tags = ['users']
//       // #swagger.description = 'Endpoint to create a new user.'
//       // #swagger.summary = 'Create a new user'
//       // #swagger.parameters['user'] = { description: 'User object', required: true, type: 'object'}
     
//     // await user.validate();
//     try {
//     const { username, email, password } = req.body;
//          console.log(req.body)
       
//         const user = new User();
//         console.log(user)
//         // const hash = await argon2.hash(user.password);
//         // console.log(hash)
//         // user.password = hash;
//         // await User.create(user);
//         // res.status(201).json(user);
//     } catch (err) {
//         res.status(404).json({ message: "createUser : " + err.message });
//     }
// }

