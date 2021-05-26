import { Router } from 'express';
import ProjectController from '@controllers/projects.controller';
import { CreateProjectDto } from '@dtos/projects.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import AuthMiddleware from '@middlewares/auth.middleware';

class ProjectsRoute implements Route {
  public path = '/api/projects';
  public router = Router();
  public projectsController = new ProjectController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authMiddleware.validate, this.projectsController.getProjects);
    this.router.get(`${this.path}/:id`, this.authMiddleware.validate, this.projectsController.getProjectById);
    this.router.get(`${this.path}/search/:code`, this.authMiddleware.validate, this.projectsController.getProjectByCode);
    this.router.post(
      `${this.path}`,
      this.authMiddleware.validate,
      validationMiddleware(CreateProjectDto, 'body'),
      this.projectsController.createProject,
    );
    this.router.put(
      `${this.path}/:id`,
      this.authMiddleware.validate,
      validationMiddleware(CreateProjectDto, 'body', true),
      this.projectsController.updateProject,
    );
    this.router.delete(`${this.path}/:id`, this.authMiddleware.validate, this.projectsController.deleteProject);
  }
}

export default ProjectsRoute;
