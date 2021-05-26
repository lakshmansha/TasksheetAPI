import mongoose from 'mongoose';
import request from 'supertest';
import App from '@app';
import { CreateTrackerDto } from '@dtos/trackers.dto';
import TrackersRoute from '@routes/trackers.route';
import { authMethod } from './common';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Trackers', () => {
  describe('[GET] /api/trackers', () => {
    it('response fineAll trackers', async () => {
      const trackersRoute = new TrackersRoute();
      const trackers = trackersRoute.trackersController.trackerService.trackers;

      await authMethod(trackersRoute);
      trackers.find = jest.fn().mockReturnValue([
        {
          _id: 'qpwoeirutytracker',
          taskId: '60706478aad6c9ad19a31c84',
          checkIn: new Date(),
          checkOut: new Date(),
          workNotes: 'Working on API',
          actualHrs: 5,
          billableHrs: 4,
          createBy: 'Lakshman',
        },
        {
          _id: 'alskdjfhg',
          taskId: '60706478aad6c9ad19a31c84',
          checkIn: new Date(),
          checkOut: new Date(),
          workNotes: 'Working on API',
          actualHrs: 2.5,
          billableHrs: 2.5,
          createBy: 'Lakshman',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([trackersRoute]);
      return request(app.getServer()).get(`${trackersRoute.path}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });

  describe('[GET] /api/trackers/:user', () => {
    it('response find Tracker By User', async () => {
      const user = 'Lakshman';

      const trackersRoute = new TrackersRoute();
      const trackers = trackersRoute.trackersController.trackerService.trackers;

      await authMethod(trackersRoute);
      trackers.findOne = jest.fn().mockReturnValue([
        {
          _id: 'alskdjfhg',
          taskId: '60706478aad6c9ad19a31c84',
          checkIn: new Date(),
          checkOut: new Date(),
          workNotes: 'Working on API',
          actualHrs: 2.5,
          billableHrs: 2.5,
          createBy: 'Lakshman',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([trackersRoute]);
      return request(app.getServer()).get(`${trackersRoute.path}/${user}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });

  describe('[POST] /api/trackers/checkin', () => {
    it('response Create Tracker', async () => {
      const trackerData: CreateTrackerDto = {
        taskId: '60706478aad6c9ad19a31c84',
        checkIn: null,
        checkOut: null,
        workNotes: null,
        actualHrs: null,
        billableHrs: null,
        createBy: 'Lakshman',
      };

      const trackersRoute = new TrackersRoute();
      const trackers = trackersRoute.trackersController.trackerService.trackers;

      await authMethod(trackersRoute);
      trackers.findOne = jest.fn().mockReturnValue(null);
      trackers.create = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad19a31c84',
        taskId: trackerData.taskId,
        checkIn: trackerData.checkIn,
        checkOut: trackerData.checkOut,
        workNotes: trackerData.workNotes,
        actualHrs: trackerData.actualHrs,
        billableHrs: trackerData.billableHrs,
        createBy: trackerData.createBy,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([trackersRoute]);
      return request(app.getServer())
        .post(`${trackersRoute.path}/checkin`)
        .set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;'])
        .send(trackerData)
        .expect(201);
    });
  });

  describe('[PUT] /api/trackers/checkout/:id', () => {
    it('response Update Tracker', async () => {
      const trackerId = '60706478aad6c9ad58631c84';
      const trackerData: CreateTrackerDto = {
        taskId: '60706478aad6c9ad19a31c84',
        checkIn: new Date(),
        checkOut: null,
        workNotes: null,
        actualHrs: null,
        billableHrs: null,
        createBy: 'Lakshman',
      };

      const trackersRoute = new TrackersRoute();
      const trackers = trackersRoute.trackersController.trackerService.trackers;

      await authMethod(trackersRoute);
      if (trackerData.taskId) {
        trackers.findOne = jest.fn().mockReturnValue({
          _id: trackerId,
          taskId: trackerData.taskId,
          checkIn: trackerData.checkIn,
          checkOut: trackerData.checkOut,
          workNotes: trackerData.workNotes,
          actualHrs: trackerData.actualHrs,
          billableHrs: trackerData.billableHrs,
          createBy: trackerData.createBy,
        });
      }

      trackers.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: trackerId,
        taskId: trackerData.taskId,
        checkIn: trackerData.checkIn,
        checkOut: trackerData.checkOut,
        workNotes: trackerData.workNotes,
        actualHrs: trackerData.actualHrs,
        billableHrs: trackerData.billableHrs,
        createBy: trackerData.createBy,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([trackersRoute]);
      return request(app.getServer())
        .put(`${trackersRoute.path}/checkout/${trackerId}`)
        .set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;'])
        .send(trackerData);
    });
  });

  describe('[PUT] /api/trackers/update/:id', () => {
    it('response Update Tracker', async () => {
      const trackerId = '60706478aad6c9ad58631c84';
      const trackerData: CreateTrackerDto = {
        taskId: '60706478aad6c9ad19a31c84',
        checkIn: new Date(),
        checkOut: new Date(),
        workNotes: 'Working on Web API',
        actualHrs: 2,
        billableHrs: 2,
        createBy: 'Lakshman',
      };

      const trackersRoute = new TrackersRoute();
      const trackers = trackersRoute.trackersController.trackerService.trackers;

      await authMethod(trackersRoute);
      if (trackerData.taskId) {
        trackers.findOne = jest.fn().mockReturnValue({
          _id: trackerId,
          taskId: trackerData.taskId,
          checkIn: trackerData.checkIn,
          checkOut: trackerData.checkOut,
          workNotes: trackerData.workNotes,
          actualHrs: trackerData.actualHrs,
          billableHrs: trackerData.billableHrs,
          createBy: trackerData.createBy,
        });
      }

      trackers.findByIdAndUpdate = jest.fn().mockReturnValue({
        _id: trackerId,
        taskId: trackerData.taskId,
        checkIn: trackerData.checkIn,
        checkOut: trackerData.checkOut,
        workNotes: trackerData.workNotes,
        actualHrs: trackerData.actualHrs,
        billableHrs: trackerData.billableHrs,
        createBy: trackerData.createBy,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([trackersRoute]);
      return request(app.getServer())
        .put(`${trackersRoute.path}/update/${trackerId}`)
        .set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;'])
        .send(trackerData);
    });
  });

  describe('[DELETE] /api/trackers/:id', () => {
    it('response Delete Tracker', async () => {
      const trackerId = '60706478aad6c9ad58631c84';

      const trackersRoute = new TrackersRoute();
      const trackers = trackersRoute.trackersController.trackerService.trackers;

      await authMethod(trackersRoute);
      trackers.findByIdAndDelete = jest.fn().mockReturnValue({
        _id: '60706478aad6c9ad58631c84',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([trackersRoute]);
      return request(app.getServer()).delete(`${trackersRoute.path}/${trackerId}`).set('Cookie', ['Authorization=eyJhbGciOiJIUzI1NiIs;']).expect(200);
    });
  });
});
