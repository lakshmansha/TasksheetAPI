import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import { CreateTaskDto } from '@dtos/tasks.dto';
import TasksRoute from '@routes/tasks.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Tasks', () => {
  describe('[GET] /api/tasks', () => {
    it('response fineAll tasks', async () => {
      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.tasksController.taskService.tasks;

      tasks.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeirutytask',
          projectId: '60706478aad6c9ad19a31c84',
          trackingCode: 'INVAPR001',
          taskName: 'Alter Web API',
          taskType: 'Development',
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
          reportedAt: new Date(),
          resource: 'Lakshman',
          estimatedHrs: 20,
          status: 'In-Progress',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).get(`${tasksRoute.path}`).expect(200);
    });
  });

  describe('[GET] /api/tasks/search/:code', () => {
    it('response findOne Task', async () => {
      const taskCode = 'PL001';

      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.tasksController.taskService.tasks;

      tasks.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeirutytask',
        projectId: '60706478aad6c9ad19a31c84',
        trackingCode: 'INVAPR001',
        taskName: 'Alter Web API',
        taskType: 'Development',
        reportedAt: new Date(),
        resource: 'Lakshman',
        estimatedHrs: 40,
        status: 'Completed',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).get(`${tasksRoute.path}/search/${taskCode}`).expect(200);
    });
  });

  describe('[GET] /api/tasks/:id', () => {
    it('response findOne Task', async () => {
      const taskId = 'qpwoeirutytask';

      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.tasksController.taskService.tasks;

      tasks.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeirutytask',
        projectId: '60706478aad6c9ad19a31c84',
        trackingCode: 'INVAPR001',
        taskName: 'Alter Web API',
        taskType: 'Development',
        reportedAt: new Date(),
        resource: 'Lakshman',
        estimatedHrs: 40,
        status: 'Completed',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).get(`${tasksRoute.path}/${taskId}`).expect(200);
    });
  });

  describe('[POST] /api/tasks', () => {
    it('response Create Task', async () => {
      const taskData: CreateTaskDto = {
        projectId: '60706478aad6c9ad19a31c84',
        trackingCode: 'INVAPR001',
        taskName: 'Alter Web API',
        taskType: 'Development',
        reportedAt: new Date(),
        resource: 'Lakshman',
        estimatedHrs: 40,
        status: 'Completed',
      };

      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.tasksController.taskService.tasks;

      tasks.findOne = jest.fn().mockReturnValue(null);
      tasks.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        projectId: taskData.projectId,
        trackingCode: taskData.trackingCode,
        taskName: taskData.taskName,
        taskType: taskData.taskType,
        reportedAt: taskData.reportedAt,
        resource: taskData.resource,
        estimatedHrs: taskData.estimatedHrs,
        status: taskData.status,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).post(`${tasksRoute.path}`).send(taskData).expect(201);
    });
  });

  describe('[PUT] /api/tasks/:id', () => {
    it('response Update Task', async () => {
      const taskId = '60706478aad6c9ad58631c84';
      const taskData: CreateTaskDto = {
        projectId: '60706478aad6c9ad19a31c84',
        trackingCode: 'INVAPR001',
        taskName: 'Alter Web API',
        taskType: 'Development',
        reportedAt: new Date(),
        resource: 'Lakshman',
        estimatedHrs: 40,
        status: 'Completed',
      };

      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.tasksController.taskService.tasks;

      if (taskData.trackingCode) {
        tasks.findOne = jest.fn().mockReturnValue({
          _id: taskId,
          projectId: taskData.projectId,
          trackingCode: taskData.trackingCode,
          taskName: taskData.taskName,
          taskType: taskData.taskType,
          reportedAt: taskData.reportedAt,
          resource: taskData.resource,
          estimatedHrs: taskData.estimatedHrs,
          status: taskData.status,
        });
      }

      tasks.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: taskId,
        projectId: taskData.projectId,
        trackingCode: taskData.trackingCode,
        taskName: taskData.taskName,
        taskType: taskData.taskType,
        reportedAt: taskData.reportedAt,
        resource: taskData.resource,
        estimatedHrs: taskData.estimatedHrs,
        status: taskData.status,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).put(`${tasksRoute.path}/${taskId}`).send(taskData);
    });
  });

  describe('[DELETE] /api/tasks/:id', () => {
    it('response Delete Task', async () => {
      const taskId = '60706478aad6c9ad58631c84';

      const tasksRoute = new TasksRoute();
      const tasks = tasksRoute.tasksController.taskService.tasks;

      tasks.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad58631c84',
        projectId: '60706478aad6c9ad19a31c84',
        trackingCode: 'INVAPR001',
        taskName: 'Alter Web API',
        taskType: 'Development',
        reportedAt: new Date(),
        resource: 'Lakshman',
        estimatedHrs: 40,
        status: 'Completed',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([tasksRoute]);
      return request(app.getServer()).delete(`${tasksRoute.path}/${taskId}`).expect(200);
    });
  });
});