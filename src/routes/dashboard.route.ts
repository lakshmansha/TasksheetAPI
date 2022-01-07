import { Router } from 'express';

import DashboardController from '@controllers/dashboard.controller';
import Route from '@interfaces/routes.interface';
import AuthMiddleware from '@middlewares/auth.middleware';

class DashboardRoute implements Route {
  public path = '/api/dashboard';
  public router = Router();
  public dashboardController = new DashboardController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/tasks/ongoing`, this.authMiddleware.validate, this.dashboardController.getOnGoingTasks);
    this.router.get(`${this.path}/tasks/complete`, this.authMiddleware.validate, this.dashboardController.getCompletedTasks);
    this.router.get(`${this.path}/tasks/backlog`, this.authMiddleware.validate, this.dashboardController.getBackLogTasks);
  }
}

export default DashboardRoute;
