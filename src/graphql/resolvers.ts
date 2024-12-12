import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db';
import { User } from '../types/indexed';

export const resolvers = {
  Query: {
    users: async (): Promise<User[]> => {
      return await db.any('SELECT id, name, email FROM users');
    },
  },
  Mutation: {
    addUser: async (_: any, { name, email, password }: { name: string; email: string; password: string }): Promise<string> => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.none('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
      return 'User added successfully';
    },
    login: async (_: any, { email, password }: { email: string; password: string }): Promise<string> => {
      const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      return token;
    },
  },
};
