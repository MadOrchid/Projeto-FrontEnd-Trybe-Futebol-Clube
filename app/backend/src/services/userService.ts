import { compareSync } from 'bcryptjs';
import 'dotenv/config';
import { sign, verify } from 'jsonwebtoken';
import User from '../database/models/user';
import ErrorHandler from '../middleware/middleware';

export interface IToken {
  email: string
}

export default class Userervice {
  public login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ErrorHandler(401, 'Incorrect email or password');
    }

    const comparePassword = compareSync(password, user.password);
    if (!comparePassword) {
      throw new ErrorHandler(401, 'Incorrect email or password');
    }

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
      throw new ErrorHandler(401, 'Token must be a valid token');
    }
  };
}
