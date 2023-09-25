import {
    Entity,
    Column,
    Unique,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity('task')
  export class Task extends BaseEntity {
    @PrimaryGeneratedColumn( {type: 'int' })
    id: number;
  
    @Column({length: 100, nullable: false})
    @Unique(['title'])
    
    title: string;

    @Column({ length: 255, nullable: false })
  @Unique(['content'])
  content: string;

  @Column({ length: 50, nullable: false })
 id_User: string;
 
  @Column({ default: false })
  isDeleted: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }