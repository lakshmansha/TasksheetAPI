import { ReportDto } from "@dtos/reports.dto";
import { Client } from "@interfaces/clients.interface";
import { Project } from "@interfaces/projects.interface";
import { Report } from "@interfaces/report.interface";
import { Task } from "@interfaces/tasks.interface";
import { Tracker } from "@interfaces/trackers.interface";

import clientModel from "@models/clients.model";
import projectModel from "@models/projects.model";
import taskModel from "@models/tasks.model";
import trackerModel from "@models/trackers.model";

class ReportService {
    public projects = projectModel;
    public clients = clientModel;
    public tasks = taskModel;
    public tracker = trackerModel;


    public async findReportByRange(reportData: ReportDto): Promise<Report[]> {
        const report: Report[] = [];
        const client: Client = await this.clients.findOne({ _id: reportData.clientId });
        const projects: Project[] = await this.projects.find({ clientId: client._id });

        const projectIds = projects.map(a => a._id);
        const tasks: Task[] = await this.tasks.find({ projectId: { $in: projectIds } });

        const tasksIds = tasks.map(a => a._id);
        const trackers: Tracker[] = await this.tracker.find({ checkIn: { $gte: reportData.fromDate, $lte: reportData.toDate }, taskId: { $in: tasksIds } });

        trackers.forEach(element => {
            const _report: Report = {} as Report;
           
            const task = tasks.find((obj) => obj._id.toString() === element.taskId);
            const project = projects.find((obj) => obj._id.toString() === task.projectId);
            
            _report.createdAt = element.checkIn;
            _report.projectName = project.projectName;
            _report.taskName = task.taskName;                                    
            _report.actualHrs = element.actualHrs;
            _report.billableHrs = element.billableHrs;
            _report.workNotes = element.workNotes;

            report.push(_report);
        });

        return report;
    }
}

export default ReportService;