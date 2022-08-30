import { Request, Response } from 'express';
import MatchesServicece from '../services/matchService';

export default class MatchesController {
  private matchesServices: MatchesServicece;

  constructor() {
    this.matchesServices = new MatchesServicece();
  }

  static async getAll(req: Request, res: Response): Promise<void> {
    const matchList = await MatchesServicece.getAll();
    res.json(matchList);
  }

  static async newMatch(req: Request, res: Response): Promise<void> {
    const { homeTeam, awayTeam } = req.body;

    if (homeTeam === awayTeam) {
      throw new Error(
        'It is not possible to create a match with two equal teams',
      );
    }

    const match = await MatchesServicece.newMatch(req.body);
    res.status(201).json(match);
  }
}
