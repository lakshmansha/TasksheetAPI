export interface Task {
  _id: string;
  projectId: string;
  trackingCode: string;
  taskType: string;
  taskName: string;
  reportedAt: Date;
  resource: string;
  estimatedHrs: number;
  status: string;
}

export interface TaskInsights {
  _id: string;
  trackingCode: string;
  taskType: string;
  taskName: string;
  reportedAt: Date;
  estimatedHrs: number;
  actualHrs: number;
  billableHrs: number;
}
