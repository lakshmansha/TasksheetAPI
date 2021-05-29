import { model, Schema, Document, SchemaTypes } from 'mongoose';
import { Project } from '@interfaces/projects.interface';

const projectSchema: Schema = new Schema(
  {
    clientId: {
      type: SchemaTypes.String,
      required: true,
    },
    projectCode: {
      type: SchemaTypes.String,
      required: true,
    },
    projectName: {
      type: SchemaTypes.String,
      required: true,
    },
    description: {
      type: SchemaTypes.String,
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

projectSchema.index({ clientId: 1, projectCode: 1, ownedBy: 1 });

const projectModel = model<Project & Document>('Project', projectSchema);

export default projectModel;
