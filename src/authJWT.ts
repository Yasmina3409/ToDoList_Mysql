require("dotenv").config();
import { Request, Response ,NextFunction} from "express";
const SECRET = process.env.SECRET;
import jwt, { VerifyErrors,TokenExpiredError } from "jsonwebtoken"
import { User } from "./entities/User";

interface CustomRequest extends Request {
    user?: string; // Définissez le type de 'user' selon vos besoins
  }
  export function generateAccessToken(pseudo: string , id: string) {
    return jwt.sign({ pseudo: pseudo , id:id }, SECRET, { expiresIn: "3600s" }); 
    
}

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
   const tokenHeader = (req.headers as { [key: string]: string })['authorization'];
    console.log(tokenHeader)
    let jwtPayload;
    if (!tokenHeader) {
      res.status(401).json({ message: 'Token inexistant.' });
    }
    const token = tokenHeader.split(' ')[1];
    jwt.verify(token, SECRET, (err: VerifyErrors | null, user: User) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          // Le token a expiré
          return res.status(401).json({ message: 'Token expiré.' });
        } else {
          // Une autre erreur s'est produite lors de la vérification du token
          return res.status(403).json({ message: 'authenticateToken : ' + err.message });
        }
      } else {
        console.log("token valid")
        // Le token est valide, vous pouvez accéder à l'utilisateur via user
        req.body.user = user;
         // Optionnel : ajoutez l'utilisateur au corps de la demande
         next()
      }
    });
   
  }
  
  
  
  
  
  
  //   if (tokenHeader == null){
  //     console.log('token null')
  //     res.status(401).json({ message: 'Token inexistant.' });
  //   } else {
  //     const token = tokenHeader.split(' ')[1];
  //       jwtPayload = jwt.verify(token, SECRET) as any;
  //       res.locals.jwtPayload = jwtPayload;
  //       jwt.verify(token, SECRET, (err: VerifyErrors | null, user: any) => {
  //         if (err instanceof TokenExpiredError) {
  //           // Le token a expiré
  //           return res.status(401).json({ message: 'Token expiré.' });
  //         } 
         
  //       } else {
  //         res.status(403).json({ message: 'authenticateToken : ' + err.message });
  //         // Ajoutez l'utilisateur au corps de la demande (req.user) pour le rendre accessible dans les middleware ultérieurs si nécessaire
  //       //   req.user = user;
  //         next();
  //       }
  //     });
  //   }
  // }
  
  export default authenticateToken;
