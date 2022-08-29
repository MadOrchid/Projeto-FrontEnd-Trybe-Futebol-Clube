import { compare } from 'bcryptjs';
import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import User from '../database/models/user';

interface IToken {
  email: string
}

export default class Userervice {
  public login = async (email: string, password: string) => {
    /* const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      throw new Error('Incorrect email or password');
    } */

    const token = sign({ email, password }, process.env.JWT_SECRET || 'jwt_secret');
    return token;
  };

  public validate = async (authorization: string) => {
    try {
      const secret = process.env.JWT_SECRET as string;
      const token = verify(authorization, secret);
      const { email } = token as IToken;
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error('Token must be a valid token');
    }
  };
}
