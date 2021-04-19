export interface Tracker {
  _id: string;
  taskId: string;
  checkIn: Date;
  checkOut: Date;
  workNotes: string;
  actualHrs: number;
  billableHrs: number;
  createBy: string;
}
