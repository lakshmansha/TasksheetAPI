import { NextFunction, Request, Response } from 'express';
import { CreateProjectDto } from '@dtos/projects.dto';
import { Project } from '@interfaces/projects.interface';
import projectService from '@services/project.service';

class ProjectsController {
  public projectService = new projectService();

  public getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['userId'];
      const findAllProjectsData: Project[] = await this.projectService.findAllProject(userId);

      res.status(200).json({ data: findAllProjectsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: string = req.params.id;
      const userId = req['userId'];
      const findOneProjectData: Project = await this.projectService.findProjectById(userId, projectId);

      res.status(200).json({ data: findOneProjectData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getProjectByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectCode: string = req.params.code;
      const userId = req['userId'];
      const findOneProjectData: Project = await this.projectService.findProjectByCode(userId, projectCode);

      res.status(200).json({ data: findOneProjectData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectData: CreateProjectDto = req.body;
      projectData.ownedBy = req['userId'];
      const createProjectData: Project = await this.projectService.createProject(projectData);

      res.status(201).json({ data: createProjectData, message: 'Project Created Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: string = req.params.id;
      const projectData: CreateProjectDto = req.body;
      projectData.ownedBy = req['userId'];
      const updateProjectData: Project = await this.projectService.updateProject(projectId, projectData);

      res.status(200).json({ data: updateProjectData, message: 'Project Updated Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projectId: string = req.params.id;
      const userId = req['userId'];
      const deleteProjectData: Project = await this.projectService.deleteProject(userId, projectId);

      res.status(200).json({ data: deleteProjectData, message: 'Project Deleted Successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectsController;
