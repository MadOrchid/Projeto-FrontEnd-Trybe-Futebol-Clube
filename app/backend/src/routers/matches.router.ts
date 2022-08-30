import { Router } from 'express';
import MatchesController from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => MatchesController.getAll(req, res));
matchesRouter.post('/', (req, res) => MatchesController.newMatch(req, res));
matchesRouter.patch('/:id/finish', (req, res) => MatchesController.updateMatch(req, res));

export default matchesRouter;
