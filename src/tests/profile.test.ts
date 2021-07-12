import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import ProfileRoute from '@routes/profile.route';
import { authMethod } from './common';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Profile', () => {
  describe('[GET] /api/profile', () => {
    it('response statusCode 200', async () => {
      const profileRoute = new ProfileRoute();
      const users = profileRoute.profileController.profileService.users;
      const clients = profileRoute.profileController.profileService.clients;
      const projects = profileRoute.profileController.profileService.projects;
      const tasks = profileRoute.profileController.profileService.tasks;

      await authMethod(profileRoute);
      users.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        email: 'a@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
        username: 'test-a',
      });

      clients.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeiruty',
          clientCode: 'CL001',
          clientName: 'Invatu Tech',
        },
        {
          _id: 'alskdjfhg',
          clientCode: 'CL002',
          clientName: 'Fincorp Tech',
        },
        {
          _id: 'zmxncbv',
          clientCode: 'CL003',
          clientName: 'Test Tech',
        },
      ]);

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

      tasks.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeirutytask',
          projectId: '60706478aad6c9ad19a31c84',
          trackingCode: 'INVAPR001',
          taskName: 'Alter Web API',
          taskType: 'Development',
          description: 'request to alter webapi',
          reportedAt: new Date(),
          resource: 'Lakshman',
          estimatedHrs: 40,
          status: 'Completed',
        },
        {
          _id: 'alskdjfhg',
          projectId: '60706478aad6c9ad19a31c84',
          trackingCode: 'INVAPR001',
          taskName: 'Alter Client App',
          taskType: 'Development',
          description: 'request to alter webapi',
          reportedAt: new Date(),
          resource: 'Lakshman',
          estimatedHrs: 20,
          status: 'In-Progress',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([profileRoute]);
      return request(app.getServer()).get(`${profileRoute.path}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });
});
