import { model, Schema, Document, SchemaTypes } from 'mongoose';
import { Client } from '@interfaces/clients.interface';

const clientSchema: Schema = new Schema(
  {
    clientCode: {
      type: SchemaTypes.String,
      required: true,
      unique: true,
    },
    clientName: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const clientModel = model<Client & Document>('Client', clientSchema);

export default clientModel;
