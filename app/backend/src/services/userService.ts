import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import User from '../database/models/user';

export default class UserService {
  public getEmail = async (email: string): Promise<User | null> => {
    const user: User | null = await User.findOne({
      where: { email },
    });
    return user;
  };

  public login = async (email: string, password:string): Promise<string> => {
    const token = sign({ email, password }, process.env.JWT_SECRET || 'jwt_secret');
    return token;
  };
}
