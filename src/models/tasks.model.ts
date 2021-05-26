import { model, Schema, Document, SchemaTypes } from 'mongoose';
import { Task } from '@interfaces/tasks.interface';

const taskSchema: Schema = new Schema(
  {
    projectId: {
      type: SchemaTypes.String,
      required: true,
    },
    trackingCode: {
      type: SchemaTypes.String,
      required: true,
    },
    taskType: {
      type: SchemaTypes.String,
      required: true,
    },
    taskName: {
      type: SchemaTypes.String,
      required: true,
    },
    description: {
      type: SchemaTypes.String,
      required: true,
    },
    reportedAt: {
      type: SchemaTypes.Date,
      required: true,
    },
    resource: {
      type: SchemaTypes.String,
      required: true,
    },
    estimatedHrs: {
      type: SchemaTypes.Number,
      required: true,
    },
    status: {
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

taskSchema.index({ projectId: 1, trackingCode: 1, ownedBy: 1 });

const taskModel = model<Task & Document>('Task', taskSchema);

export default taskModel;
