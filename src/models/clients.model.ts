import { model, Schema, Document } from 'mongoose';
import { Client } from '@interfaces/clients.interface';

const clientSchema: Schema = new Schema({
  clientCode: {
    type: String,
    required: true,
    unique: true,
  },
  clientName: {
    type: String,
    required: true,
  },
});

const clientModel = model<Client & Document>('Client', clientSchema);

export default clientModel;
