import moment from 'moment';

import { CreateTrackerDto } from '@dtos/trackers.dto';
import HttpException from '@exceptions/HttpException';
import { Tracker } from '@interfaces/trackers.interface';
import trackersModel from '@models/trackers.model';
import { isEmpty } from '@utils/util';

class TrackerService {
  public trackers = trackersModel;

  public async findAllTracker(): Promise<Tracker[]> {
    const trackers: Tracker[] = await this.trackers.find();
    return trackers;
  }

  public async findTrackerByUser(user: string): Promise<Tracker> {
    if (isEmpty(user)) throw new HttpException(400, "You're not user");

    const findTracker: Tracker = await this.trackers.findOne({ createBy: user });
    if (!findTracker) throw new HttpException(409, "You're not tracker");

    return findTracker;
  }

  public async CheckIn(trackerData: CreateTrackerDto): Promise<Tracker> {
    if (isEmpty(trackerData)) throw new HttpException(400, "You're not trackerData");

    const today = moment().startOf('day');

    const findTracker: Tracker = await this.trackers.findOne({
      createBy: trackerData.createBy,
      checkIn: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate(),
      },
    });
    if (findTracker) throw new HttpException(409, `You're Tracker ${trackerData.taskId} already exists`);

    trackerData.checkIn = new Date();
    const createTrackerData: Tracker = await this.trackers.create({ ...trackerData });

    return createTrackerData;
  }

  public async CheckOut(trackerId: string, trackerData: CreateTrackerDto): Promise<Tracker> {
    if (isEmpty(trackerData)) throw new HttpException(400, "You're not trackerData");

    const findTracker: Tracker = await this.trackers.findOne({ _id: trackerId });
    if (!findTracker) throw new HttpException(409, `You're Tracker not exists`);

    if (findTracker.checkIn !== undefined) throw new HttpException(409, `You're Check-In Time not exists`);

    trackerData.checkOut = new Date();
    const checkOutById: Tracker = await this.trackers.findByIdAndUpdate(trackerId, trackerData);
    if (!checkOutById) throw new HttpException(409, "You're not Tracker");

    return checkOutById;
  }

  public async UpdateNotes(trackerId: string, trackerData: CreateTrackerDto): Promise<Tracker> {
    if (isEmpty(trackerData)) throw new HttpException(400, "You're not trackerData");

    const findTracker: Tracker = await this.trackers.findOne({ _id: trackerId });
    if (!findTracker) throw new HttpException(409, `You're Tracker not exists`);

    if (findTracker.checkIn !== undefined) throw new HttpException(409, `You're Check-In Time not exists`);
    if (findTracker.checkOut !== undefined) throw new HttpException(409, `You're Check-In Time not exists`);

    const updateNotesById: Tracker = await this.trackers.findByIdAndUpdate(trackerId, trackerData);
    if (!updateNotesById) throw new HttpException(409, "You're not Tracker");

    return updateNotesById;
  }

  public async deleteTracker(trackerId: string): Promise<Tracker> {
    const deleteTrackerById: Tracker = await this.trackers.findByIdAndDelete(trackerId);
    if (!deleteTrackerById) throw new HttpException(409, "You're not task");

    return deleteTrackerById;
  }
}

export default TrackerService;
