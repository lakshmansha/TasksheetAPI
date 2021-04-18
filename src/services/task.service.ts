import { CreateTaskDto } from '@dtos/tasks.dto';
import HttpException from '@exceptions/HttpException';
import { Task } from '@interfaces/tasks.interface';
import taskModel from '@models/tasks.model';
import { isEmpty } from '@utils/util';

class TaskService {
  public tasks = taskModel;

  public async findAllTask(): Promise<Task[]> {
    const tasks: Task[] = await this.tasks.find();
    return tasks;
  }

  public async findTaskByCode(trackingCode: string): Promise<Task> {
    if (isEmpty(trackingCode)) throw new HttpException(400, "You're not trackingCode");

    const findTask: Task = await this.tasks.findOne({ trackingCode: trackingCode });
    if (!findTask) throw new HttpException(409, "You're not task");

    return findTask;
  }

  public async findTaskById(taskId: string): Promise<Task> {
    if (isEmpty(taskId)) throw new HttpException(400, "You're not taskId");

    const findTask: Task = await this.tasks.findOne({ _id: taskId });
    if (!findTask) throw new HttpException(409, "You're not task");

    return findTask;
  }

  public async createTask(taskData: CreateTaskDto): Promise<Task> {
    if (isEmpty(taskData)) throw new HttpException(400, "You're not taskData");

    const findTask: Task = await this.tasks.findOne({ trackingCode: taskData.trackingCode });
    if (findTask) throw new HttpException(409, `You're email ${taskData.trackingCode} already exists`);

    const createTaskData: Task = await this.tasks.create({ ...taskData });

    return createTaskData;
  }

  public async updateTask(taskId: string, taskData: CreateTaskDto): Promise<Task> {
    if (isEmpty(taskData)) throw new HttpException(400, "You're not taskData");

    if (taskData.trackingCode) {
      const findTask: Task = await this.tasks.findOne({ trackingCode: taskData.trackingCode });
      if (findTask && findTask._id != taskId) throw new HttpException(409, `You're Task Code ${taskData.trackingCode} already exists`);
    }

    const updateTaskById: Task = await this.tasks.findByIdAndUpdate(taskId, taskData);
    if (!updateTaskById) throw new HttpException(409, "You're not task");

    return updateTaskById;
  }

  public async deleteTask(taskId: string): Promise<Task> {
    const deleteTaskById: Task = await this.tasks.findByIdAndDelete(taskId);
    if (!deleteTaskById) throw new HttpException(409, "You're not task");

    return deleteTaskById;
  }
}

export default TaskService;
