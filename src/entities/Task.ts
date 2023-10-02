import {
    Entity,
    Column,
    Unique,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
   
  } from "typeorm";
import { User } from "./User";
  @Entity('task')
  export class Task extends BaseEntity {
    @PrimaryGeneratedColumn( {type: 'int' })
    id: number;
  
    @Column({length: 100, nullable: false})
    @Unique(['title'])
    
    title: string;

    @Column({ length: 255, nullable: false })

  content: string;
  //   @Column({ length: 25, nullable: false })
  // classification: string;

//   @Column({ length: 50, nullable: false })
//  id_User: string;
 
  @Column({ default: false })
  isDone: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;


    @ManyToOne(() => User, (user) => user.tasks)
// Assurez-vous que le nom de la colonne de clé étrangère correspond
  id_User: number;

    
  }