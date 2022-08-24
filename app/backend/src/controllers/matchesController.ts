import { Request, Response } from 'express';
import MatchesServicece from '../services/matchService';

export default class MatchesController {
  private matchesServices: MatchesServicece;

  constructor() {
    this.matchesServices = new MatchesServicece();
  }

  public getAll = async (req: Request, res: Response) => {
    const matches = await this.matchesServices.getAll();
    res.status(200).json(matches);
  };
}
