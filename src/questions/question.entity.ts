import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Answer } from 'src/answers/answer.entity';

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(
    type => User,
    user => user.questions,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  @OneToMany(
    type => Answer,
    answer => answer.question,
    { eager: true },
  )
  answers: Answer[];
}
