import { Router } from 'express';
import ClientController from '@controllers/clients.controller';
import { CreateClientDto } from '@dtos/clients.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import AuthMiddleware from '@middlewares/auth.middleware';

class ClientsRoute implements Route {
  public path = '/api/clients';
  public router = Router();
  public clientsController = new ClientController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authMiddleware.validate, this.clientsController.getClients);
    this.router.get(`${this.path}/:id`, this.authMiddleware.validate, this.clientsController.getClientById);
    this.router.get(`${this.path}/search/:code`, this.authMiddleware.validate, this.clientsController.getClientByCode);
    this.router.post(
      `${this.path}`,
      this.authMiddleware.validate,
      validationMiddleware(CreateClientDto, 'body'),
      this.clientsController.createClient,
    );
    this.router.put(
      `${this.path}/:id`,
      this.authMiddleware.validate,
      validationMiddleware(CreateClientDto, 'body', true),
      this.clientsController.updateClient,
    );
    this.router.delete(`${this.path}/:id`, this.authMiddleware.validate, this.clientsController.deleteClient);
  }
}

export default ClientsRoute;
