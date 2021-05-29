import { NextFunction, Request, Response } from 'express';
import { CreateClientDto } from '@dtos/clients.dto';
import { Client } from '@interfaces/clients.interface';
import clientService from '@services/client.service';

class ClientsController {
  public clientService = new clientService();

  public getClients = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['userId'];
      const findAllClientsData: Client[] = await this.clientService.findAllClient(userId);

      res.status(200).json({ data: findAllClientsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getClientById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId: string = req.params.id;
      const userId = req['userId'];
      const findOneClientData: Client = await this.clientService.findClientById(userId, clientId);

      res.status(200).json({ data: findOneClientData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getClientByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientCode: string = req.params.code;
      const userId = req['userId'];
      const findOneClientData: Client = await this.clientService.findClientByCode(userId, clientCode);

      res.status(200).json({ data: findOneClientData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientData: CreateClientDto = req.body;
      clientData.ownedBy = req['userId'];
      const createClientData: Client = await this.clientService.createClient(clientData);

      res.status(201).json({ data: createClientData, message: 'Client Created Successfuly' });
    } catch (error) {
      next(error);
    }
  };

  public updateClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId: string = req.params.id;
      const clientData: CreateClientDto = req.body;
      clientData.ownedBy = req['userId'];
      const updateClientData: Client = await this.clientService.updateClient(clientId, clientData);

      res.status(200).json({ data: updateClientData, message: 'Client Updated Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clientId: string = req.params.id;
      const userId = req['userId'];
      const deleteClientData: Client = await this.clientService.deleteClient(userId, clientId);

      res.status(200).json({ data: deleteClientData, message: 'Client Deleted Succesfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default ClientsController;
