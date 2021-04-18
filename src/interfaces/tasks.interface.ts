export interface Task {
  _id: string;
  projectId: string;
  trackingCode: string;
  taskType: string;
  taskName: string;
  reportedAt: string;
  resource: string;
  estimatedHrs: number;
  status: string;
}
