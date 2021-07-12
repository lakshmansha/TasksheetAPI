import HttpException from '@exceptions/HttpException';
import { UserStats } from '@interfaces/profile.interface';
import { User } from '@interfaces/users.interface';
import clientModel from '@models/clients.model';
import projectModel from '@models/projects.model';
import taskModel from '@models/tasks.model';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';

class ProfileService {
  public users = userModel;
  public clients = clientModel;
  public projects = projectModel;
  public tasks = taskModel;

  public async findUserStatsById(userId: string): Promise<UserStats> {
    const rtnCount: UserStats = {} as UserStats;
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    const clients = await this.clients.find({ ownedBy: userId });
    rtnCount.clients = clients.length;

    const projects = await this.projects.find({ ownedBy: userId });
    rtnCount.projects = projects.length;

    const tasks = await this.tasks.find({ ownedBy: userId });
    rtnCount.tasks = tasks.length;

    return rtnCount;
  }
}

export default ProfileService;
