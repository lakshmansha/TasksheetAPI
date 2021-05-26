import { model, Schema, Document, SchemaTypes } from 'mongoose';
import { Client } from '@interfaces/clients.interface';

const clientSchema: Schema = new Schema(
  {
    clientCode: {
      type: SchemaTypes.String,
      required: true,
    },
    clientName: {
      type: SchemaTypes.String,
      required: true,
    },
    ownedBy: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

clientSchema.index({ clientCode: 1, ownedBy: 1 });

const clientModel = model<Client & Document>('Client', clientSchema);

export default clientModel;
