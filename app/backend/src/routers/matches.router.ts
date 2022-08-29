import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', (req, res) => matchesController.getAll(req, res));

export default matchesRouter;
