import { Router } from 'express';
import TeamController from '../controllers/teamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', teamController.getAllTeam);
teamRouter.get('/:id', teamController.getById);

export default teamRouter;
