import { NextFunction, Request, Response } from 'express';
import { CreateTrackerDto } from '@dtos/trackers.dto';
import { Tracker } from '@interfaces/trackers.interface';
import trackerService from '@services/tracker.service';

class TrackersController {
  public trackerService = new trackerService();

  public getTrackers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['userId'];
      const findAllTrackersData: Tracker[] = await this.trackerService.findAllTracker(userId);

      res.status(200).json({ data: findAllTrackersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTrackerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId: string = req.params.id;
      const userId = req['userId'];
      const findOneTaskData: Tracker = await this.trackerService.findTrackerById(userId, taskId);

      res.status(200).json({ data: findOneTaskData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public getTrackersByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: string = req.params.user;
      const userId = req['userId'];
      const findAllTrackersData: Tracker[] = await this.trackerService.findTrackerByUser(userId, user);

      res.status(200).json({ data: findAllTrackersData, message: 'findByUser' });
    } catch (error) {
      next(error);
    }
  };

  public checkInTracker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trackerData: CreateTrackerDto = req.body;
      trackerData.ownedBy = req['userId'];
      const createTrackerData: Tracker = await this.trackerService.CheckIn(trackerData);

      res.status(201).json({ data: createTrackerData, message: 'Check-In Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public checkOutTracker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trackerId: string = req.params.id;
      const trackerData: CreateTrackerDto = req.body;
      trackerData.ownedBy = req['userId'];
      const updateTrackerData: Tracker = await this.trackerService.CheckOut(trackerId, trackerData);

      res.status(200).json({ data: updateTrackerData, message: 'Check-Out Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createTracker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trackerData: CreateTrackerDto = req.body;
      trackerData.ownedBy = req['userId'];
      const createTrackerData: Tracker = await this.trackerService.CreateTracker(trackerData);

      res.status(201).json({ data: createTrackerData, message: 'Tracker Created Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public UpdateTracker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trackerId: string = req.params.id;
      const trackerData: CreateTrackerDto = req.body;
      trackerData.ownedBy = req['userId'];
      const updateTrackerData: Tracker = await this.trackerService.UpdateNotes(trackerId, trackerData);

      res.status(200).json({ data: updateTrackerData, message: 'Tracker Updated Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTracker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trackerId: string = req.params.id;
      const userId = req['userId'];
      const deleteTrackerData: Tracker = await this.trackerService.deleteTracker(userId, trackerId);

      res.status(200).json({ data: deleteTrackerData, message: 'Tracker Deleted Successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default TrackersController;
