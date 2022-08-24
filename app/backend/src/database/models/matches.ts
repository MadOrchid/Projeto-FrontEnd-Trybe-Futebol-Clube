import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './team';

export default class Matches extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: number;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  modelName: 'matches',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Matches.belongsTo(Team, {
  foreignKey: 'homeTeam',
  as: 'teamHome',
});
Matches.belongsTo(Team, {
  foreignKey: 'awayTeam',
  as: 'teamAway',
});

Team.hasMany(Matches, {
  foreignKey: 'homeTeam',
  as: 'idHomeTeam',
});

Team.hasMany(Matches, {
  foreignKey: 'awayTeam',
  as: 'idAwayTeam',
});
