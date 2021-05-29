import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import { CreateProjectDto } from '@dtos/projects.dto';
import ProjectsRoute from '@routes/projects.route';
import { authMethod } from './common';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Projects', () => {
  describe('[GET] /api/projects', () => {
    it('response fineAll projects', async () => {
      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      await authMethod(projectsRoute);
      projects.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          clientId: 'qpwoeiruty',
          projectCode: 'PL001',
          projectName: 'Web API',
          description: '',
        },
        {
          _id: 'alskdjfhg',
          clientId: 'qpwoeiruty',
          projectCode: 'PL002',
          projectName: 'Fincorp Tech',
          description: '',
        },
        {
          _id: 'zmxncbv',
          clientId: 'qpwoeiruty',
          projectCode: 'PL003',
          projectName: 'Test Tech',
          description: '',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer()).get(`${projectsRoute.path}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });

  describe('[GET] /api/projects/search/:code', () => {
    it('response findOne Project', async () => {
      const projectCode = 'PL001';

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      await authMethod(projectsRoute);
      projects.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        clientId: 'qpwoeiruty',
        projectCode: 'PL001',
        projectName: 'Web API',
        description: '',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer())
        .get(`${projectsRoute.path}/search/${projectCode}`)
        .set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;'])
        .expect(200);
    });
  });

  describe('[GET] /api/projects/:id', () => {
    it('response findOne Project', async () => {
      const projectId = 'qpwoeiruty';

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      await authMethod(projectsRoute);
      projects.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        clientId: 'qpwoeiruty',
        projectCode: 'PL001',
        projectName: 'Web API',
        description: '',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer()).get(`${projectsRoute.path}/${projectId}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });

  describe('[POST] /api/projects', () => {
    it('response Create Project', async () => {
      const projectData: CreateProjectDto = {
        clientId: 'qpwoeiruty',
        projectCode: 'PL001',
        projectName: 'Web Api',
        description: '',
      };

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      await authMethod(projectsRoute);
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
      return request(app.getServer())
        .post(`${projectsRoute.path}`)
        .send(projectData)
        .set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;'])
        .expect(201);
    });
  });

  describe('[PUT] /api/projects/:id', () => {
    it('response Update Project', async () => {
      const projectId = '60706478aad6c9ad19a31c84';
      const projectData: CreateProjectDto = {
        clientId: 'qpwoeiruty',
        projectCode: 'PL001',
        projectName: 'Web Api',
        description: '',
      };

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      await authMethod(projectsRoute);
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
      return request(app.getServer())
        .put(`${projectsRoute.path}/${projectId}`)
        .set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;'])
        .send(projectData);
    });
  });

  describe('[DELETE] /api/projects/:id', () => {
    it('response Delete Project', async () => {
      const projectId = '60706478aad6c9ad19a31c84';

      const projectsRoute = new ProjectsRoute();
      const projects = projectsRoute.projectsController.projectService.projects;

      await authMethod(projectsRoute);
      projects.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        clientId: 'qpwoeiruty',
        projectCode: 'PL001',
        projectName: 'Web Api',
        description: '',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([projectsRoute]);
      return request(app.getServer()).delete(`${projectsRoute.path}/${projectId}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });
});
