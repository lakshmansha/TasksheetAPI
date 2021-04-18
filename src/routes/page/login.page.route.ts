import { NextFunction, Request, Response, Router } from 'express';
import Route from '@interfaces/routes.interface';

class LoginPageRoute implements Route {
  public path = '/login';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private Index = (req: Request, res: Response, next: NextFunction) => {
    try {
      const login = true;
      res.render('layout', { pageTitle: 'Login', template: 'login', login });
    } catch (error) {
      next(error);
    }
  };

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.Index);
  }
}

export default LoginPageRoute;
