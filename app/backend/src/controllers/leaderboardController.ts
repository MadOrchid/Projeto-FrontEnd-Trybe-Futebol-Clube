import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';
import MatchesServicece from '../services/matchService';
import TeamService from '../services/teamService';

export default class LeaderboardController {
  static async listHome(req: Request, res: Response) {
    const teamList = await TeamService.listTeamsId();
    const matchList = await MatchesServicece.getAllFinished();

    const matches = teamList.map((team) =>
      matchList.filter((match) => match.homeTeam === team));

    const board = matches.map((team) => LeaderboardService.tablePoint(team));
    const orderedLeaderboard = LeaderboardService.orderBoard(board);
    res.status(200).json(orderedLeaderboard);
  }
}
