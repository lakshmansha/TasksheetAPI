import { NextFunction, Request, Response } from 'express';

import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { User } from '@interfaces/users.interface';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: User[] = await this.userService.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'Found All Users.' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['userId'];
      const findOneUserData: User = await this.userService.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'Found One User.' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: User = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'User Created Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['userId'];
      const userData: UpdateUserDto = req.body;
      const updateUserData: User = await this.userService.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'User Updated Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['userId'];
      const deleteUserData: User = await this.userService.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'User Deleted Successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
