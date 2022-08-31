import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();
leaderboardRouter.get('/home', (req, res) => LeaderboardController.listHome(req, res));

export default leaderboardRouter;
