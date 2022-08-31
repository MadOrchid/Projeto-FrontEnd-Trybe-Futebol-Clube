import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();
leaderboardRouter.get('/home', (req, res) => LeaderboardController.listHome(req, res));
leaderboardRouter.get('/away', (req, res) => LeaderboardController.listAway(req, res));
leaderboardRouter.get('/', (req, res) => LeaderboardController.listAll(req, res));

export default leaderboardRouter;
