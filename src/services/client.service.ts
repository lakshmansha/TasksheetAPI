import { CreateClientDto } from '@dtos/clients.dto';
import HttpException from '@exceptions/HttpException';
import { Client } from '@interfaces/clients.interface';
import clientModel from '@models/clients.model';
import { isEmpty } from '@utils/util';

class ClientService {
  public clients = clientModel;

  public async findAllClient(ownedBy: string): Promise<Client[]> {
    const clients: Client[] = await this.clients.find({ ownedBy: ownedBy });
    return clients;
  }

  public async findClientByCode(ownedBy: string, clientCode: string): Promise<Client> {
    if (isEmpty(clientCode)) throw new HttpException(400, "You're not clientCode");

    const findClient: Client = await this.clients.findOne({ clientCode: clientCode, ownedBy: ownedBy });
    if (!findClient) throw new HttpException(409, "You're not client");

    return findClient;
  }

  public async findClientById(ownedBy: string, clientId: string): Promise<Client> {
    if (isEmpty(clientId)) throw new HttpException(400, "You're not clientId");

    const findClient: Client = await this.clients.findOne({ _id: clientId, ownedBy: ownedBy });
    if (!findClient) throw new HttpException(409, "You're not client");

    return findClient;
  }

  public async createClient(clientData: CreateClientDto): Promise<Client> {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    const findClient: Client = await this.clients.findOne({ clientCode: clientData.clientCode, ownedBy: clientData.ownedBy });
    if (findClient) throw new HttpException(409, `You're email ${clientData.clientCode} already exists`);

    const createClientData: Client = await this.clients.create({ ...clientData });

    return createClientData;
  }

  public async updateClient(clientId: string, clientData: CreateClientDto): Promise<Client> {
    if (isEmpty(clientData)) throw new HttpException(400, "You're not clientData");

    if (clientData.clientCode) {
      const findClient: Client = await this.clients.findOne({ clientCode: clientData.clientCode, ownedBy: clientData.ownedBy });
      if (findClient && findClient._id != clientId) throw new HttpException(409, `You're Client Code ${clientData.clientCode} already exists`);
    }

    const updateClientById: Client = await this.clients.findByIdAndUpdate(clientId, clientData);
    if (!updateClientById) throw new HttpException(409, "You're not client");

    return updateClientById;
  }

  public async deleteClient(ownedBy: string, clientId: string): Promise<Client> {
    const deleteClientById: Client = await this.clients.findByIdAndDelete({ _id: clientId, ownedBy: ownedBy });
    if (!deleteClientById) throw new HttpException(409, "You're not client");

    return deleteClientById;
  }
}

export default ClientService;
