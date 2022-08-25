import * as express from 'express';
import MatchesController from './controllers/matchesController';
import TeamController from './controllers/teamController';
import UserController from './controllers/userController';

class App {
  public app: express.Express;
  private userController = new UserController();
  public teamController = new TeamController();
  public matchesController = new MatchesController();

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', this.userController.login);
    this.app.get('/teams', this.teamController.getAllTeam);
    this.app.get('/teams/:id', this.teamController.getById);
    this.app.get('/matches', (req, res) => this.matchesController.getAll(req, res));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
