export interface Report {
    createdAt: Date;
    projectName: string;
    taskName: string;
    workNotes: string;    
    actualHrs: number;
    billableHrs: number;
  }
  