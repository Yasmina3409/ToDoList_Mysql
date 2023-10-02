import {
    Entity,
    Column,
    Unique,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from "typeorm";
  import {Task} from  "./Task"
  @Entity('user')
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn( {type: 'int' })
    id: number;
  
    @Column({length: 255, nullable: false})
    @Unique(['username'])
    // @Unique(['email'])
    username: string;

  @Column({ length: 100, nullable: false })
  @Unique(['email'])
  email: string;
  @Column({ length: 100, nullable: false })
  password: string;
//   @Column({ default: false })
//   isDeleted: boolean;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Task, (task) => task.id_User)
tasks: Task[]

  }