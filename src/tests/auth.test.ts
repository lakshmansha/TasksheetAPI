import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import { CreateUserDto, AuthUserDto } from '@dtos/users.dto';
import AuthRoute from '@routes/auth.route';

import 'dotenv/config';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /api/auth/signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
        username: 'test',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        username: 'test',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer()).post(`${authRoute.path}signup`).send(userData);
    });
  });

  describe('[POST] /api/auth/login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: AuthUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r4!',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;

      users.findOne = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
        username: 'test',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}login`)
        .send(userData)
        .expect('Set-Cookie', /^Authorization=.+/);
    });
  });

  describe('[POST] /api/auth/logout', () => {
    it('logout Set-Cookie Authorization=; Max-age=0', async () => {
      const authRoute = new AuthRoute();
      const users = authRoute.authController.authService.users;
      const middleware = authRoute.authMiddleware;

      const userData = {
        _id: '60706478aad6c9ad19a31c84',
        email: 'test@email.com',
        password: await bcrypt.hash('q1w2e3r4!', 10),
        username: 'test',
      };

      middleware.validateUser = jest.fn().mockReturnValue(userData);

      users.findOne = jest.fn().mockReturnValue(userData);

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`${authRoute.path}logout`)
        .set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;'])
        .expect('Set-Cookie', /^Authorization=\; Max-age=0/);
    });
  });
});
