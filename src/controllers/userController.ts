







import { Request, Response } from "express";
import argon2 from "argon2";
// import { getRepository } from "typeorm"; // Importez getRepository depuis TypeORM
import { User } from "../entities/User";
import myDataSource from "../config/bd";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRepository = myDataSource.getRepository(User);

    // Affichez le contenu de req.body pour le débogage
    console.log("req.body:", req.body);

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

