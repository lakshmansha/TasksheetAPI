import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import Route from '@interfaces/routes.interface';
import AuthMiddleware from '@middlewares/auth.middleware';

class IndexRoute implements Route {
  public path = '/api';
  public router = Router();
  public indexController = new IndexController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authMiddleware.validate, this.indexController.index);
  }
}

export default IndexRoute;
