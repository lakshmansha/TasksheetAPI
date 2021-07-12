import { NextFunction, Request, Response } from 'express';

import profileService from '@services/profile.service';
import { UserStats } from '@interfaces/profile.interface';

class ProfileController {
  public profileService = new profileService();

  public getUserStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req['userId'];
      const findUserStatsData: UserStats = await this.profileService.findUserStatsById(userId);

      res.status(200).json({ data: findUserStatsData, message: 'Found One User Stats.' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProfileController;
