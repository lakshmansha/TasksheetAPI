import bcrypt from 'bcrypt';
import { CreateClientDto } from '@dtos/clients.dto';
import HttpException from '@exceptions/HttpException';
import { Client } from '@interfaces/clients.interface';
import clientModel from '@models/clients.model';
import { isEmpty } from '@utils/util';

class ClientService {
  public clients = clientModel;

  public async findAllClient(): Promise<Client[]> {
    const clients: Client[] = await this.clients.find();
    return clients;
  }

  public async findClientByCode(clientCode: string): Promise<Client> {
    if (isEmpty(clientCode)) throw new HttpException(400, "You're not clientId");

    const findClient: Client = await this.clients.findOne({ clientCode: clientCode });
    if (!findClient) throw new HttpException(409, "You're not client");

    return findClient;
  }

  public async findClientById(clientId: string): Promise<Client> {
    if (isEmpty(clientId)) throw new HttpException(400, "You're not clientId");

    const findClient: Client = await this.clients.findOne({ _id: clientId });
    if (!findClient) throw new HttpException(409, "You're not client");

    return findClient;
  }

  public async createClient(clientData: CreateClientDto): Promise<Client> {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    const findClient: Client = await this.clients.findOne({ clientCode: clientData.clientCode });
    if (findClient) throw new HttpException(409, `You're email ${clientData.clientCode} already exists`);

    const createClientData: Client = await this.clients.create({ ...clientData });

    return createClientData;
  }

  public async updateClient(clientId: string, clientData: CreateClientDto): Promise<Client> {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    if (clientData.clientCode) {
      const findClient: Client = await this.clients.findOne({ email: clientData.clientCode });
      if (findClient && findClient._id != clientId) throw new HttpException(409, `You're Client Code ${clientData.clientCode} already exists`);
    }

    const updateClientById: Client = await this.clients.findByIdAndUpdate(clientId, { clientData });
    if (!updateClientById) throw new HttpException(409, "You're not client");

    return updateClientById;
  }

  public async deleteClient(clientId: string): Promise<Client> {
    const deleteClientById: Client = await this.clients.findByIdAndDelete(clientId);
    if (!deleteClientById) throw new HttpException(409, "You're not client");

    return deleteClientById;
  }
}

export default ClientService;
