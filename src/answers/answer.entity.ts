import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Question } from 'src/questions/question.entity';
import { User } from 'src/auth/user.entity';

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(
    type => Question,
    question => question.answers,
    { eager: false },
  )
  question: Question;

  @Column()
  questionId: number;

  @ManyToOne(
    type => User,
    user => user.answers,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}
