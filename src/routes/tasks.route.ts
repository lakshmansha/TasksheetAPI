import { Router } from 'express';
import TaskController from '@controllers/tasks.controller';
import { CreateTaskDto } from '@dtos/tasks.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import AuthMiddleware from '@middlewares/auth.middleware';

class TasksRoute implements Route {
  public path = '/api/tasks';
  public router = Router();
  public tasksController = new TaskController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authMiddleware.validate, this.tasksController.getTasks);
    this.router.get(`${this.path}/:id`, this.authMiddleware.validate, this.tasksController.getTaskById);
    this.router.get(`${this.path}/search/:code`, this.authMiddleware.validate, this.tasksController.getTaskByCode);
    this.router.post(`${this.path}`, this.authMiddleware.validate, validationMiddleware(CreateTaskDto, 'body'), this.tasksController.createTask);
    this.router.put(
      `${this.path}/:id`,
      this.authMiddleware.validate,
      validationMiddleware(CreateTaskDto, 'body', true),
      this.tasksController.updateTask,
    );
    this.router.delete(`${this.path}/:id`, this.authMiddleware.validate, this.tasksController.deleteTask);
  }
}

export default TasksRoute;
