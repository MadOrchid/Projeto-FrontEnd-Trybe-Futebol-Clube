import { Request, Response } from 'express';
import TeamService from '../services/teamService';

export default class TeamController {
  public getAllTeam = async (req: Request, res: Response) => {
    const teams = await TeamService.getAllTeam();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const team = await TeamService.getById(Number(req.params.id));
    return res.status(200).json(team);
  };
}
