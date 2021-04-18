import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import { CreateProjectDto } from '@dtos/projects.dto';
import ProjectsRoute from '@routes/projects.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Projects', () => {
  describe('[GET] /api/projects', () => {
    it('response fineAll projects', async () => {
      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      projects.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          clientId: 'CL001',
          projectCode: 'PL001',
          projectName: 'Web API',
          description: '',
        },
        {
          _id: 'alskdjfhg',
          clientId: 'CL001',
          projectCode: 'PL002',
          projectName: 'Fincorp Tech',
          description: '',
        },
        {
          _id: 'zmxncbv',
          clientId: 'CL001',
          projectCode: 'PL003',
          projectName: 'Test Tech',
          description: '',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer()).get(`${projectsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /api/projects/search/:code', () => {
    it('response findOne Project', async () => {
      const projectCode = 'PL001';

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      projects.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        clientId: 'CL001',
        projectCode: 'PL001',
        projectName: 'Web API',
        description: '',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer()).get(`${projectsRoute.path}/search/${projectCode}`).expect(200);
    });
  });

  describe('[GET] /api/projects/:id', () => {
    it('response findOne Project', async () => {
      const projectId = 'qpwoeiruty';

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      projects.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        clientId: 'CL001',
        projectCode: 'PL001',
        projectName: 'Web API',
        description: '',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer()).get(`${projectsRoute.path}/${projectId}`).expect(200);
    });
  });

  describe('[POST] /api/projects', () => {
    it('response Create Project', async () => {
      const projectData: CreateProjectDto = {
        clientId: 'CL001',
        projectCode: 'PL001',
        projectName: 'Web Api',
        description: '',
      };

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      projects.findOne = jest.fn().mockReturnValue(null);
      projects.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        clientId: projectData.clientId,
        projectCode: projectData.projectCode,
        projectName: projectData.projectName,
        description: projectData.description,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer()).post(`${projectsRoute.path}`).send(projectData).expect(201);
    });
  });

  describe('[PUT] /api/projects/:id', () => {
    it('response Update Project', async () => {
      const projectId = '60706478aad6c9ad19a31c84';
      const projectData: CreateProjectDto = {
        clientId: 'CL001',
        projectCode: 'PL001',
        projectName: 'Web Api',
        description: '',
      };

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      if (projectData.projectCode) {
        projects.findOne = jest.fn().mockReturnValue({
          _id: projectId,
          clientId: projectData.clientId,
          projectCode: projectData.projectCode,
          projectName: projectData.projectName,
        });
      }

      projects.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: projectId,
        clientId: projectData.clientId,
        projectCode: projectData.projectCode,
        projectName: projectData.projectName,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer()).put(`${projectsRoute.path}/${projectId}`).send(projectData);
    });
  });

  describe('[DELETE] /api/projects/:id', () => {
    it('response Delete Project', async () => {
      const projectId = '60706478aad6c9ad19a31c84';

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      projects.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        clientId: 'CL001',
        projectCode: 'PL001',
        projectName: 'Web Api',
        description: '',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer()).delete(`${projectsRoute.path}/${projectId}`).expect(200);
    });
  });
});
