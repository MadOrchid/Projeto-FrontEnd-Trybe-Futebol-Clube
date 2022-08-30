import * as jwt from 'jsonwebtoken';
import { IToken } from './userService';

export default class JwtService {
  static sign(payload : { email:string, password:string }): string {
    return jwt.sign(payload, 'jwt_secret');
  }

  static confirToken(token: string) : IToken {
    const validToken = jwt.verify(token, 'jwt_secret');
    return validToken as IToken;
  }
}
