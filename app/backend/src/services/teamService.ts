import Team from '../database/models/team';

export default class TeamService {
  public static async getAllTeam(): Promise<Team[]> {
    const teams = await Team.findAll();
    return teams;
  }

  public static async getById(id: number) {
    const team = await Team.findByPk(id);
    return team;
  }

  static async listTeamsId() : Promise<number[]> {
    const listRawData = await Team.findAll({ attributes: ['id'] });
    const idList = listRawData.map((team) => team.id);
    return idList;
  }
}
