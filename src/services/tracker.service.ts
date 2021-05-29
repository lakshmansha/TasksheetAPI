import moment from 'moment';

import { CreateTrackerDto } from '@dtos/trackers.dto';
import HttpException from '@exceptions/HttpException';
import { Tracker } from '@interfaces/trackers.interface';
import trackersModel from '@models/trackers.model';
import { isEmpty } from '@utils/util';

class TrackerService {
  public trackers = trackersModel;

  public async findAllTracker(ownedBy: string): Promise<Tracker[]> {
    const trackers: Tracker[] = await this.trackers.find({ ownedBy: ownedBy });
    return trackers;
  }

  public async findTrackerById(ownedBy: string, trackerId: string): Promise<Tracker> {
    if (isEmpty(trackerId)) throw new HttpException(400, "You're not trackerId");

    const findTask: Tracker = await this.trackers.findOne({ ownedBy: ownedBy, _id: trackerId });
    if (!findTask) throw new HttpException(409, "You're not tracker");

    return findTask;
  }

  public async findTrackerByUser(ownedBy: string, user: string): Promise<Tracker[]> {
    if (isEmpty(user)) throw new HttpException(400, "You're not user");

    const findTrackers: Tracker[] = await this.trackers.find({ ownedBy: ownedBy, createBy: user });
    if (!findTrackers) throw new HttpException(409, "You're not trackers");

    return findTrackers;
  }

  public async CheckIn(trackerData: CreateTrackerDto): Promise<Tracker> {
    if (isEmpty(trackerData)) throw new HttpException(400, "You're not trackerData");

    const today = moment().startOf('day');

    const findTracker: Tracker = await this.trackers.findOne({
      createBy: trackerData.createBy,
      ownedBy: trackerData.ownedBy,
      checkIn: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      },
      checkOut: undefined,
    });
    if (findTracker) throw new HttpException(409, `You're Tracker Check-In already exists`);

    trackerData.checkIn = new Date();
    const createTrackerData: Tracker = await this.trackers.create({ ...trackerData });

    return createTrackerData;
  }

  public async CheckOut(trackerId: string, trackerData: CreateTrackerDto): Promise<Tracker> {
    if (isEmpty(trackerData)) throw new HttpException(400, "You're not trackerData");

    const findTracker: Tracker = await this.trackers.findOne({ ownedBy: trackerData.ownedBy, _id: trackerId });
    if (!findTracker) throw new HttpException(409, `You're Tracker not exists`);

    if (findTracker.checkIn === undefined) throw new HttpException(409, `You're Check-In Time not exists`);
    if (findTracker.checkOut !== undefined) throw new HttpException(409, `You're Check-Out Time already exists`);

    trackerData.checkOut = new Date();
    const checkOutById: Tracker = await this.trackers.findByIdAndUpdate(trackerId, trackerData);
    if (!checkOutById) throw new HttpException(409, "You're not Tracker");

    return checkOutById;
  }

  public async CreateTracker(trackerData: CreateTrackerDto): Promise<Tracker> {
    if (isEmpty(trackerData)) throw new HttpException(400, "You're not trackerData");

    const createTaskData: Tracker = await this.trackers.create({ ...trackerData });

    return createTaskData;
  }

  public async UpdateNotes(trackerId: string, trackerData: CreateTrackerDto): Promise<Tracker> {
    if (isEmpty(trackerData)) throw new HttpException(400, "You're not trackerData");

    const findTracker: Tracker = await this.trackers.findOne({ ownedBy: trackerData.ownedBy, _id: trackerId });
    if (!findTracker) throw new HttpException(409, `You're Tracker not exists`);

    if (findTracker.checkIn === undefined) throw new HttpException(409, `You're Check-In Time not exists`);
    if (findTracker.checkOut === undefined) throw new HttpException(409, `You're Check-In Time not exists`);

    const updateNotesById: Tracker = await this.trackers.findByIdAndUpdate(trackerId, trackerData);
    if (!updateNotesById) throw new HttpException(409, "You're not Tracker");

    return updateNotesById;
  }

  public async deleteTracker(ownedBy: string, trackerId: string): Promise<Tracker> {
    const deleteTrackerById: Tracker = await this.trackers.findByIdAndDelete({ ownedBy: ownedBy, trackerId: trackerId });
    if (!deleteTrackerById) throw new HttpException(409, "You're not tracker");

    return deleteTrackerById;
  }
}

export default TrackerService;
