import { Router } from 'express';
import TrackerController from '@controllers/trackers.controller';
import { CreateTrackerDto } from '@dtos/trackers.dto';
import Route from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TrackersRoute implements Route {
  public path = '/api/trackers';
  public router = Router();
  public trackersController = new TrackerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.trackersController.getTrackers);
    this.router.get(`${this.path}/:user`, this.trackersController.getTrackersByUser);
    this.router.post(`${this.path}/checkin`, validationMiddleware(CreateTrackerDto, 'body'), this.trackersController.checkInTracker);
    this.router.put(`${this.path}/checkout/:id`, validationMiddleware(CreateTrackerDto, 'body', true), this.trackersController.checkOutTracker);
    this.router.put(`${this.path}/update/:id`, validationMiddleware(CreateTrackerDto, 'body', true), this.trackersController.UpdateTracker);
    this.router.delete(`${this.path}/:id`, this.trackersController.deleteTracker);
  }
}

export default TrackersRoute;
