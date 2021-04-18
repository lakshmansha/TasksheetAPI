import { model, Schema, Document } from 'mongoose';
import { Project } from '@interfaces/projects.interface';

const projectSchema: Schema = new Schema({
  clientId: {
    type: String,
    required: true,
  },
  projectCode: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

projectSchema.index({ clientId: 1, projectCode: 1 });

const projectModel = model<Project & Document>('Project', projectSchema);

export default projectModel;
