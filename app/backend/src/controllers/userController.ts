import 'dotenv/config';
import { Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    await this.service.validateLogin(email, password);

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const token = await this.service.login(email, password);
    res.status(200).json({ token });
  };

  public validate = async (req: Request, res:Response) => {
    const { authorization } = req.headers;
    const user = await this.service.validate(String(authorization));
    res.status(200).json({ role: user?.role });
  };
}
