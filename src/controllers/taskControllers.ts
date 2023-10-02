import { Request, Response, } from "express";
import jwt from 'jsonwebtoken';
import { Task } from "../entities/Task";
import myDataSource from "../config/bd"
import { Any } from "typeorm";
const taskRepository = myDataSource.getRepository(Task);


export const createTask = async (req: Request, res: Response) => {
      // #swagger.tags = ['tasks']
      // #swagger.description = 'Endpoint to create a new task.'
      // #swagger.summary = 'Create a new task'
      // #swagger.responses[200] = { description: 'Create a new task with title- content- isDone end username'}
  try {
    const userId: number = req.body.user.id
    const task = new Task();
    // // Copiez les autres propriétés de req.body dans la tâche
    Object.assign(task, req.body);
    task.id_User = userId
    console.log(task);
    // Utilisez le QueryBuilder pour insérer la tâche avec la colonne idUserId définie
    await taskRepository.createQueryBuilder().insert().into(Task).values(task).execute();
    // Enregistrez l'utilisateur dans la base de données
    await taskRepository.save(task);
    return res.status(201).json({ message: "Task créé avec succès", task });
  } catch (err) {
    console.error("Erreur lors de la création de la task :", err);
    return res.status(500).json({ message: "Erreur lors de la création de lla task", error: err.message });
  }
};

export const getTask = async (req: Request, res: Response) => {
  // #swagger.tags = ['tasks']
  // #swagger.description = 'Endpoint to get all tasks.'
  // #swagger.summary = 'Get all tasks'
  // #swagger.responses[200] = { description: 'Tasks found.' }
  const user_id  :string= req.body.user.id
  // /console.log(user_id)
  try {
  const task = taskRepository.createQueryBuilder("task");
  task
    .leftJoinAndSelect("task.id_User", "user") // Effectuez une jointure avec la table utilisateur
    .where("user.id = :user_id", { user_id }) // Ajoutez une condition pour filtrer par ID d'utilisateur
    .getMany()
    .then((task) => {
      // Vous avez ici la liste des tâches avec les données de l'utilisateur
      return res.status(200).json({ message: "task recupérer avec succès", task })
    })
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la recupération : " + err.message });
  }
}

export const getTaskCompleted = async (req: Request, res: Response) => {
  // #swagger.tags = ['tasks']
  // #swagger.description = 'Endpoint to get all tasks completed.'
  // #swagger.summary = 'Get all tasks completed'
  // #swagger.responses[200] = { description: 'Tasks completed found.' }
  const user_id = req.body.user.id
  console.log(user_id)
  try {
    const task = taskRepository.createQueryBuilder("task");
    task
   // Effectuez une jointure avec la table utilisateur
   .leftJoinAndSelect("task.id_User", "user")
    .where("task.isDone = :isDone AND task.id_User = :user_id", { isDone: true, user_id })
    .getMany()
    .then((task) => {
      // Vous avez ici la liste des tâches avec les données de l'utilisateur
      return res.status(200).json({ message: "task recupérer avec succès", task })
    })
    
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la recupération : " + err.message });
  }
}




export const updateTask = async (req: Request, res: Response) => {
  // #swagger.tags = ['tasks']
  // #swagger.description = 'Endpoint to delete task.'
  // #swagger.summary = 'update task'
  // #swagger.responses[200] = { description: 'update task' }
  try {
    const task = await taskRepository.findOneBy({ id: parseInt(req.params.id) });
    try {
      Object.assign(task, req.body);
      await taskRepository.save(task);
      res.json(task);
    } catch (err) {
      res.status(400).json(err.message);
    }
  } catch (err) {
    res.status(404).json(err.message);
  }
   

}















