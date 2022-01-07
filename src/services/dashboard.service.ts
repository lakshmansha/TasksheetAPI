import taskModel from '@models/tasks.model';
import { TaskInsights, Task } from '@interfaces/tasks.interface';

class DashboardService {
    public tasks = taskModel;

    public async findTasksByStatus(ownedBy: string, status: string): Promise<TaskInsights[]> {
        const joinQuery = [
            {
                '$match': {
                    'status': status,
                    'ownedBy': ownedBy
                }
            }, {
                '$addFields': {
                    'taskId': {
                        '$toString': '$_id'
                    }
                }
            }, {
                '$lookup': {
                    'from': 'trackers',
                    'localField': 'taskId',
                    'foreignField': 'taskId',
                    'as': 'trackers'
                }
            }, {
                '$project': {
                    'trackingCode': 1,
                    'taskType': 1,
                    'taskName': 1,
                    'estimatedHrs': 1,
                    'reportedAt': 1,
                    'actualHrs': {
                        '$sum': {
                            '$sum': '$trackers.actualHrs'
                        }
                    },
                    'billableHrs': {
                        '$sum': {
                            '$sum': '$trackers.billableHrs'
                        }
                    }
                }
            }
        ];

        const rtnData: TaskInsights[] = await taskModel.aggregate(joinQuery);
        return rtnData;
    }
}

export default DashboardService;