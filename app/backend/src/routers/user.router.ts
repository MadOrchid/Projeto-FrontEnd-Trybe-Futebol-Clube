import { Router } from 'express';
import UserController from '../controllers/userController';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', (req, res) => userController.login(req, res));
userRouter.get('/validate', (req, res) => userController.validate(req, res));

export default userRouter;
