import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import AuthMiddleware from '@middlewares/auth.middleware';

class UsersRoute implements Route {
  public path = '/api/users';
  public router = Router();
  public usersController = new UsersController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authMiddleware.validate, this.usersController.getUsers);
    this.router.get(`${this.path}/id`, this.authMiddleware.validate, this.usersController.getUserById);
    this.router.post(`${this.path}`, this.authMiddleware.validate, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}`, this.authMiddleware.validate, validationMiddleware(UpdateUserDto, 'body', true), this.usersController.updateUser);
    this.router.delete(`${this.path}`, this.authMiddleware.validate, this.usersController.deleteUser);
  }
}

export default UsersRoute;
