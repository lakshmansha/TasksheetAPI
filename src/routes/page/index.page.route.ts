import { NextFunction, Request, Response, Router } from 'express';
import Route from '@interfaces/routes.interface';
import UsersController from '@controllers/users.controller';

class IndexPageRoute implements Route {
  public path = '/';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private Index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render('layout', { pageTitle: 'Welcome', template: 'index' });
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.Index);
  }
}

export default IndexPageRoute;
