import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    await this.service.validateLogin(email, password);
    const token = await this.service.login(email, password);
    response.status(200).json({ token });
  };

  public validate = async (request: Request, response: Response) => {
    const { authorization } = request.headers;
    const user = await this.service.validate(String(authorization));
    response.status(200).json({ role: user?.role });
  };
}
