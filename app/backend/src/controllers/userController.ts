import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: 'All fields must be filled' });
    }

    const token = await this.service.login(email, password);
    response.status(200).json({ token });
  };

  public validate = async (request: Request, response: Response) => {
    const { authorization } = request.headers;
    const user = await this.service.validate(authorization as string);
    response.status(200).json({ role: user?.role });
  };
}
