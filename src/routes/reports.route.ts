import { Router } from 'express';
import ReportController from '@controllers/reports.controller';
import { ReportDto } from '@dtos/reports.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import AuthMiddleware from '@middlewares/auth.middleware';


class TasksRoute implements Route {
  public path = '/api/reports';
  public router = Router();
  public reportsController = new ReportController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.authMiddleware.validate, validationMiddleware(ReportDto, 'body'), this.reportsController.getReportByClient);   
  }
}

export default TasksRoute;
