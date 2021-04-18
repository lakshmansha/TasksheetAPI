import { NextFunction, Request, Response } from 'express';
import { CreateTrackerDto } from '@dtos/trackers.dto';
import { Tracker } from '@interfaces/trackers.interface';
import trackerService from '@services/tracker.service';

class TrackersController {
  public trackerService = new trackerService();

  public getTrackers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTrackersData: Tracker[] = await this.trackerService.findAllTracker();

      res.status(200).json({ data: findAllTrackersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTrackersByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTrackersData: Tracker[] = await this.trackerService.findAllTracker();

      res.status(200).json({ data: findAllTrackersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public checkInTracker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trackerData: CreateTrackerDto = req.body;
      const createTrackerData: Tracker = await this.trackerService.CheckIn(trackerData);

      res.status(201).json({ data: createTrackerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public checkOutTracker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trackerId: string = req.params.id;
      const trackerData: CreateTrackerDto = req.body;
      const updateTrackerData: Tracker = await this.trackerService.CheckOut(trackerId, trackerData);

      res.status(200).json({ data: updateTrackerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTracker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trackerId: string = req.params.id;
      const deleteTrackerData: Tracker = await this.trackerService.deleteTracker(trackerId);

      res.status(200).json({ data: deleteTrackerData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TrackersController;
