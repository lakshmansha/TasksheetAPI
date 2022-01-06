import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import DashboardRoute from '@routes/dashboard.route';
import { authMethod } from './common';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Dashboard', () => {
  describe('[GET] /api/dashboard/tasks/ongoing', () => {
    it('response statusCode 200', async () => {
      const dashboardRoute = new DashboardRoute();
      const tasks = dashboardRoute.dashboardController.dashboardService.tasks;

      await authMethod(dashboardRoute);
     
      tasks.aggregate = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeirutytask',
          trackingCode: 'INVAPR001',
          taskName: 'Alter Web API',
          taskType: 'Development',
          reportedAt: new Date(),
          estimatedHrs: 40,
          actualHrs: 35,
          billableHrs: 30
        },
        {
          _id: 'alskdjfhg',
          trackingCode: 'INVAPR001',
          taskName: 'Alter Client App',
          taskType: 'Development',
          reportedAt: new Date(),
          estimatedHrs: 20,
          actualHrs: 18,
          billableHrs: 18
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([dashboardRoute]);
      return request(app.getServer()).get(`${dashboardRoute.path}/tasks/ongoing`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });

  describe('[GET] /api/dashboard/tasks/complete', () => {
    it('response statusCode 200', async () => {
      const dashboardRoute = new DashboardRoute();
      const tasks = dashboardRoute.dashboardController.dashboardService.tasks;

      await authMethod(dashboardRoute);
     
      tasks.aggregate = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeirutytask',
          trackingCode: 'INVAPR001',
          taskName: 'Alter Web API',
          taskType: 'Development',
          reportedAt: new Date(),
          estimatedHrs: 40,
          actualHrs: 35,
          billableHrs: 30
        },
        {
          _id: 'alskdjfhg',
          trackingCode: 'INVAPR001',
          taskName: 'Alter Client App',
          taskType: 'Development',
          reportedAt: new Date(),
          estimatedHrs: 20,
          actualHrs: 18,
          billableHrs: 18
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([dashboardRoute]);
      return request(app.getServer()).get(`${dashboardRoute.path}/tasks/complete`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });

  describe('[GET] /api/dashboard/tasks/backlog', () => {
    it('response statusCode 200', async () => {
      const dashboardRoute = new DashboardRoute();
      const tasks = dashboardRoute.dashboardController.dashboardService.tasks;

      await authMethod(dashboardRoute);
     
      tasks.aggregate = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeirutytask',
          trackingCode: 'INVAPR001',
          taskName: 'Alter Web API',
          taskType: 'Development',
          reportedAt: new Date(),
          estimatedHrs: 40,
          actualHrs: 35,
          billableHrs: 30
        },
        {
          _id: 'alskdjfhg',
          trackingCode: 'INVAPR001',
          taskName: 'Alter Client App',
          taskType: 'Development',
          reportedAt: new Date(),
          estimatedHrs: 20,
          actualHrs: 18,
          billableHrs: 18
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([dashboardRoute]);
      return request(app.getServer()).get(`${dashboardRoute.path}/tasks/backlog`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });
});
