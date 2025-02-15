import { Request, Response } from 'express';
import MatchesServicece from '../services/matchService';
import TeamService from '../services/teamService';

export default class MatchesController {
  static async getAll(req: Request, res: Response): Promise<void> {
    const matchList = await MatchesServicece.getAll();
    res.json(matchList);
  }

  static async newMatch(req: Request, res: Response): Promise<void> {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const match = await MatchesServicece.newMatch(req.body);
    res.status(201).json(match);

    const team = await TeamService.getById(homeTeam);

    if (!team) {
      res.status(404).json({ message: 'There is no team with such id' });
    }
  }

  static async updateMatch(req: Request, res:Response): Promise<void> {
    const { id } = req.params;

    const match = await MatchesServicece.updateMatch(Number(id));
    if (!match) {
      res.status(401).json('Match not found');
    } else {
      res.status(200).json('Finished');
    }
  }

  static async update(req:Request, res:Response) {
    const { id } = req.params;
    const { body } = req;
    await MatchesServicece.update(+id, body.homeTeamGoals, body.awayTeamGoals);
    res.json({ message: 'Updated' });
  }
}
