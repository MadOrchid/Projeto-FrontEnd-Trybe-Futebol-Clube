import Team from '../database/models/team';

export default class TeamService {
  public static async getAllTeam(): Promise<Team[]> {
    const teams = await Team.findAll();
    return teams;
  }
}
