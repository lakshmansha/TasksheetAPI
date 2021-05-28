import { Router } from 'express';
import TrackerController from '@controllers/trackers.controller';
import { CreateTrackerDto, InsertTrackerDto } from '@dtos/trackers.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import AuthMiddleware from '@middlewares/auth.middleware';

class TrackersRoute implements Route {
  public path = '/api/trackers';
  public router = Router();
  public trackersController = new TrackerController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.authMiddleware.validate, this.trackersController.getTrackers);
    this.router.get(`${this.path}/:id`, this.authMiddleware.validate, this.trackersController.getTrackerById);
    this.router.get(`${this.path}/search/:user`, this.authMiddleware.validate, this.trackersController.getTrackersByUser);
    this.router.post(
      `${this.path}/checkin`,
      this.authMiddleware.validate,
      validationMiddleware(CreateTrackerDto, 'body'),
      this.trackersController.checkInTracker,
    );
    this.router.put(
      `${this.path}/checkout/:id`,
      this.authMiddleware.validate,
      validationMiddleware(CreateTrackerDto, 'body', true),
      this.trackersController.checkOutTracker,
    );
    this.router.post(
      `${this.path}/insert`,
      this.authMiddleware.validate,
      validationMiddleware(InsertTrackerDto, 'body'),
      this.trackersController.createTracker,
    );
    this.router.put(
      `${this.path}/update/:id`,
      this.authMiddleware.validate,
      validationMiddleware(InsertTrackerDto, 'body', true),
      this.trackersController.UpdateTracker,
    );
    this.router.delete(`${this.path}/:id`, this.authMiddleware.validate, this.trackersController.deleteTracker);
  }
}

export default TrackersRoute;
