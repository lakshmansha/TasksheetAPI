import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import { CreateClientDto } from '@dtos/clients.dto';
import ClientsRoute from '@routes/clients.route';
import { authMethod } from './common';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Clients', () => {
  describe('[GET] /api/clients', () => {
    it('response fineAll clients', async () => {
      const clientsRoute = new ClientsRoute();
      const clients = clientsRoute.clientsController.clientService.clients;

      await authMethod(clientsRoute);
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

      (mongoose as any).connect = jest.fn();
      const app = new App([clientsRoute]);
      return request(app.getServer()).get(`${clientsRoute.path}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });

  describe('[GET] /api/clients/search/:code', () => {
    it('response findOne Client', async () => {
      const clientCode = 'CL001';

      const clientsRoute = new ClientsRoute();
      const clients = clientsRoute.clientsController.clientService.clients;

      await authMethod(clientsRoute);
      clients.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        clientCode: 'CL001',
        clientName: 'Invatu Tech',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([clientsRoute]);
      return request(app.getServer())
        .get(`${clientsRoute.path}/search/${clientCode}`)
        .set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;'])
        .expect(200);
    });
  });

  describe('[GET] /api/clients/:id', () => {
    it('response findOne Client', async () => {
      const clientId = 'qpwoeiruty';

      const clientsRoute = new ClientsRoute();
      const clients = clientsRoute.clientsController.clientService.clients;

      await authMethod(clientsRoute);
      clients.findOne = jest.fn().mockReturnValue({
        _id: 'qpwoeiruty',
        clientCode: 'CL001',
        clientName: 'Invatu Tech',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([clientsRoute]);
      return request(app.getServer()).get(`${clientsRoute.path}/${clientId}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });

  describe('[POST] /api/clients', () => {
    it('response Create Client', async () => {
      const clientData: CreateClientDto = {
        clientCode: 'CL001',
        clientName: 'Tech Val',
      };

      const clientsRoute = new ClientsRoute();
      const clients = clientsRoute.clientsController.clientService.clients;

      await authMethod(clientsRoute);
      clients.findOne = jest.fn().mockReturnValue(null);
      clients.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        clientCode: clientData.clientCode,
        clientName: clientData.clientName,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([clientsRoute]);
      return request(app.getServer())
        .post(`${clientsRoute.path}`)
        .set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;'])
        .send(clientData)
        .expect(201);
    });
  });

  describe('[PUT] /api/clients/:id', () => {
    it('response Update Client', async () => {
      const clientId = '60706478aad6c9ad19a31c84';
      const clientData: CreateClientDto = {
        clientCode: 'CL001',
        clientName: 'Tech Val',
      };

      const clientsRoute = new ClientsRoute();
      const clients = clientsRoute.clientsController.clientService.clients;

      await authMethod(clientsRoute);
      if (clientData.clientCode) {
        clients.findOne = jest.fn().mockReturnValue({
          _id: clientId,
          clientCode: clientData.clientCode,
          clientName: clientData.clientName,
        });
      }

      clients.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: clientId,
        clientCode: clientData.clientCode,
        clientName: clientData.clientName,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([clientsRoute]);
      return request(app.getServer()).put(`${clientsRoute.path}/${clientId}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).send(clientData);
    });
  });

  describe('[DELETE] /api/clients/:id', () => {
    it('response Delete Client', async () => {
      const clientId = '60706478aad6c9ad19a31c84';

      const clientsRoute = new ClientsRoute();
      const clients = clientsRoute.clientsController.clientService.clients;

      await authMethod(clientsRoute);
      clients.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        clientCode: 'CL001',
        clientName: 'Tech Val',
        ownedBy: '34j38794243nksejhkq2k3h',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([clientsRoute]);
      return request(app.getServer()).delete(`${clientsRoute.path}/${clientId}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });
});
