import { model, Schema, Document, SchemaTypes } from 'mongoose';
import { Tracker } from '@interfaces/trackers.interface';

const trackerSchema: Schema = new Schema(
  {
    taskId: {
      type: SchemaTypes.String,
      required: true,
    },
    checkIn: {
      type: SchemaTypes.Date,
      required: false,
    },
    checkOut: {
      type: SchemaTypes.Date,
      required: false,
    },
    workNotes: {
      type: SchemaTypes.String,
      required: false,
    },
    actualHrs: {
      type: SchemaTypes.Number,
      required: false,
    },
    billableHrs: {
      type: SchemaTypes.Number,
      required: false,
    },
    createBy: {
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

const trackerModel = model<Tracker & Document>('Tracker', trackerSchema);

export default trackerModel;
