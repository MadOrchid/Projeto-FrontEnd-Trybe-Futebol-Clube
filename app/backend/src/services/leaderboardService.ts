import Match from '../database/models/matches';

interface IBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}

export default class LeaderboardService {
  static efficiencyCal(totalPoints:number, totalGames: number): string {
    const rate = totalPoints / (totalGames * 3);
    return (rate * 100).toFixed(2);
  }

  static tablePoint(match: Match[]) {
    const leaderboard = {
      name: match[0].teamHome.teamName,
      totalGames: match.length,
      totalPoints: 0,
      totalVictories: match.filter((game: Match) => game.homeTeamGoals > game.awayTeamGoals).length,
      totalDraws: match.filter((game: Match) => game.homeTeamGoals === game.awayTeamGoals).length,
      totalLosses: match.filter(
        (game: Match) => game.homeTeamGoals < game.awayTeamGoals,
      ).length,
      goalsFavor: match.reduce((acc:number, game: Match) => acc + game.homeTeamGoals, 0),
      goalsOwn: match.reduce((acc:number, game: Match) => acc + game.awayTeamGoals, 0),
      goalsBalance: 0,
      efficiency: '0, 00' };
    leaderboard.totalPoints = (leaderboard.totalVictories * 3) + leaderboard.totalDraws;
    leaderboard.goalsBalance = leaderboard.goalsFavor - leaderboard.goalsOwn;
    leaderboard.efficiency = this.efficiencyCal(leaderboard.totalPoints, leaderboard.totalGames);

    return leaderboard;
  }

  static orderBoard(leaderboard: IBoard[]) {
    return leaderboard
      .sort((a: IBoard, b: IBoard) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
  }

  static tableAwayPoint(match: Match[]) {
    const leaderboard = {
      name: match[0].teamAway.teamName,
      totalGames: match.length,
      totalPoints: 0,
      totalVictories: match.filter((game: Match) => game.awayTeamGoals > game.homeTeamGoals).length,
      totalDraws: match.filter((game: Match) => game.awayTeamGoals === game.homeTeamGoals).length,
      totalLosses: match.filter((game: Match) => game.awayTeamGoals < game.homeTeamGoals).length,
      goalsFavor: match.reduce((acc:number, game: Match) => acc + game.awayTeamGoals, 0),
      goalsOwn: match.reduce((acc:number, game: Match) => acc + game.homeTeamGoals, 0),
      goalsBalance: 0,
      efficiency: '0, 00' };

    leaderboard.totalPoints = (leaderboard.totalVictories * 3) + leaderboard.totalDraws;
    leaderboard.goalsBalance = leaderboard.goalsFavor - leaderboard.goalsOwn;
    leaderboard.efficiency = this.efficiencyCal(leaderboard.totalPoints, leaderboard.totalGames);

    return leaderboard;
  }

  static socer(home: IBoard, away: IBoard) {
    const leaderboard = {
      name: home.name,
      totalGames: home.totalGames + away.totalGames,
      totalPoints: home.totalVictories + away.totalPoints,
      totalVictories: home.totalVictories + away.totalVictories,
      totalDraws: home.totalDraws + away.totalDraws,
      totalLosses: home.totalLosses + away.totalLosses,
      goalsFavor: home.goalsFavor + away.goalsFavor,
      goalsOwn: home.goalsOwn + away.goalsOwn,
      goalsBalance: 0,
      efficiency: '0, 00',
    };
    return leaderboard;
  }
}
