import { NextFunction, Request, Response } from 'express';

import dashboardService from '@services/dashboard.service';
import { TaskInsights } from '@interfaces/tasks.interface';
import { TaskStatus } from '@enum/task.enum';

class DashboardController {
    public dashboardService = new dashboardService();

    public getOnGoingTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const status: string = TaskStatus.InProgress;
            const userId = req['userId'];
            const findTasks: TaskInsights[] = await this.dashboardService.findTasksByStatus(userId, status);

            res.status(200).json({ data: findTasks, message: 'Found OnGoing Tasks.' });
        } catch (error) {
            next(error);
        }
    };

    public getCompletedTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const status: string = TaskStatus.Completed;
            const userId = req['userId'];
            const findTasks: TaskInsights[] = await this.dashboardService.findTasksByStatus(userId, status);

            res.status(200).json({ data: findTasks, message: 'Found Completed Tasks.' });
        } catch (error) {
            next(error);
        }
    };

    public getBackLogTasks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const status: string = TaskStatus.BackLog;
            const userId = req['userId'];
            const findTasks: TaskInsights[] = await this.dashboardService.findTasksByStatus(userId, status);

            res.status(200).json({ data: findTasks, message: 'Found BackLog Tasks.' });
        } catch (error) {
            next(error);
        }
    };
}

export default DashboardController;
