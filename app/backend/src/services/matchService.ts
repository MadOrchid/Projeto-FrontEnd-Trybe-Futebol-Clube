import 'dotenv/config';
import Matches from '../database/models/matches';
import Team from '../database/models/team';

export default class MatchesServicece {
  static async getAll() : Promise<Matches[]> {
    const matches = await Matches.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  static async newMatch(matchData: Matches): Promise<Matches> {
    const match: Matches = await Matches.create({ ...matchData, inProgress: 1 });
    return match;
  }
}
