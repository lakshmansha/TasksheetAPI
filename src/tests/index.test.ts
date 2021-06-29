import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import IndexRoute from '@routes/index.route';
import { authMethod } from './common';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /api', () => {
    it('response statusCode 200', async () => {
      const indexRoute = new IndexRoute();

      await authMethod(indexRoute);
      (mongoose as any).connect = jest.fn();
      const app = new App([indexRoute]);
      return request(app.getServer()).get(`${indexRoute.path}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });
});
