import { compare } from 'bcryptjs';
import 'dotenv/config';
import Joi = require('joi');
import { sign, verify } from 'jsonwebtoken';
import User from '../database/models/user';

interface IToken {
  email:string;
}

export default class UserService {
  public validateLogin = async (email:string, password:string) => {
    const message = { 'string.empty': 'All fields must be filled' };
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }).messages(message);

    const result = await schema.validateAsync({ email, password });

    return result;
  };

  public getEmail = async (email:string): Promise<User | null> => {
    const user = await User.findOne({ where: { email } });
    return user;
  };

  public login = async (email:string, password:string): Promise<string> => {
    const user = await this.getEmail(email);

    if (!user || !compare(password, user.password)) {
      const error = new Error('Incorrect email or password');
      throw error;
    }

    const token = sign({ email, password }, process.env.JWT_SECRET || 'jwt_secret');
    return token;
  };

  public validate = async (authorization:string): Promise<User | null> => {
    const token = verify(authorization, process.env.JWT_SECRET || 'jwt_secret');
    const { email } = token as IToken;
    const user: User | null = await this.getEmail(email);
    return user;
  };
}
