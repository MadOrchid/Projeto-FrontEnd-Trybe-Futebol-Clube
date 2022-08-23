import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const token = await this.service.login(email, password);
    res.status(200).json({ token });
  };
}
