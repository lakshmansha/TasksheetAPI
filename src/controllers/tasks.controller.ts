import { NextFunction, Request, Response } from 'express';
import { CreateTaskDto } from '@dtos/tasks.dto';
import { Task } from '@interfaces/tasks.interface';
import taskService from '@services/task.service';

class TasksController {
  public taskService = new taskService();

  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['userId'];
      const findAllTasksData: Task[] = await this.taskService.findAllTask(userId);

      res.status(200).json({ data: findAllTasksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;
      const userId = req['userId'];
      const findOneTaskData: Task = await this.taskService.findTaskById(userId, taskId);

      res.status(200).json({ data: findOneTaskData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getTaskByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trackingCode: string = req.params.code;
      const userId = req['userId'];
      const findOneTaskData: Task = await this.taskService.findTaskByCode(userId, trackingCode);

      res.status(200).json({ data: findOneTaskData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData: CreateTaskDto = req.body;
      taskData.ownedBy = req['userId'];
      const createTaskData: Task = await this.taskService.createTask(taskData);

      res.status(201).json({ data: createTaskData, message: 'Task Created Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;
      const taskData: CreateTaskDto = req.body;
      taskData.ownedBy = req['userId'];
      const updateTaskData: Task = await this.taskService.updateTask(taskId, taskData);

      res.status(200).json({ data: updateTaskData, message: 'Task Updated Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;
      const userId = req['userId'];
      const deleteTaskData: Task = await this.taskService.deleteTask(userId, taskId);

      res.status(200).json({ data: deleteTaskData, message: 'Task Deleted Successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default TasksController;
