import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto, AuthUserDto } from '@dtos/users.dto';
import Route from '@interfaces/routes.interface';
import AuthMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Route {
  public path = '/api/auth/';
  public router = Router();
  public authController = new AuthController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(AuthUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, this.authMiddleware.validate, this.authController.logOut);
  }
}

export default AuthRoute;
