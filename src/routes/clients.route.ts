import { Router } from 'express';
import ClientController from '@controllers/clients.controller';
import { CreateClientDto } from '@dtos/clients.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class ClientsRoute implements Route {
  public path = '/api/clients';
  public router = Router();
  public clientsController = new ClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.clientsController.getClients);
    this.router.get(`${this.path}/:id`, this.clientsController.getClientById);
    this.router.get(`${this.path}/:code`, this.clientsController.getClientByCode);
    this.router.post(`${this.path}`, validationMiddleware(CreateClientDto, 'body'), this.clientsController.createClient);
    this.router.put(`${this.path}/:id`, validationMiddleware(CreateClientDto, 'body', true), this.clientsController.updateClient);
    this.router.delete(`${this.path}/:id`, this.clientsController.deleteClient);
  }
}

export default ClientsRoute;
