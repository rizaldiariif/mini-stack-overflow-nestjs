import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { Question } from 'src/questions/question.entity';
import { Answer } from 'src/answers/answer.entity';
import { scrypt } from 'crypto';
import { promisify } from 'util';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(
    type => Question,
    question => question.user,
    { eager: true },
  )
  questions: Question[];

  @OneToMany(
    type => Answer,
    answer => answer.user,
    { eager: true },
  )
  answers: Answer[];

  async validatePassword(
    storedPassword: string,
    suppliedPassword: string,
  ): Promise<boolean> {
    const scryptAsync = promisify(scrypt);

    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buffer.toString('hex') === hashedPassword;
  }
}
