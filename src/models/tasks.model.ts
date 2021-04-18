import { model, Schema, Document, SchemaTypes } from 'mongoose';
import { Task } from '@interfaces/tasks.interface';

const taskSchema: Schema = new Schema({
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
  reportedAt: {
    type: SchemaTypes.String,
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
});

taskSchema.index({ projectId: 1, trackingCode: 1 });

const projectModel = model<Task & Document>('Task', taskSchema);

export default projectModel;
