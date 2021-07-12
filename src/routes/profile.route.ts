import { Router } from 'express';

import ProfileController from '@controllers/profile.controller';
import Route from '@interfaces/routes.interface';
import AuthMiddleware from '@middlewares/auth.middleware';

class ProfileRoute implements Route {
  public path = '/api/profile';
  public router = Router();
  public profileController = new ProfileController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authMiddleware.validate, this.profileController.getUserStats);
  }
}

export default ProfileRoute;
