import 'dotenv/config';
import Matches from '../database/models/matches';
import Team from '../database/models/team';

export default class MatchesServicece {
  public getAll = async () => {
    const matches = await Matches.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'teamHome',
          attributes: ['teamName'],
        },
      ],
    });
    return matches;
  };
}
