import { CreateProjectDto } from '@dtos/projects.dto';
import HttpException from '@exceptions/HttpException';
import { Project } from '@interfaces/projects.interface';
import projectModel from '@models/projects.model';
import { isEmpty } from '@utils/util';

class ProjectService {
  public projects = projectModel;

  public async findAllProject(ownedBy: string): Promise<Project[]> {
    const projects: Project[] = await this.projects.find({ ownedBy: ownedBy });
    return projects;
  }

  public async findProjectByCode(ownedBy: string, projectCode: string): Promise<Project> {
    if (isEmpty(projectCode)) throw new HttpException(400, "You're not projectCode");

    const findProject: Project = await this.projects.findOne({ ownedBy: ownedBy, projectCode: projectCode });
    if (!findProject) throw new HttpException(409, "You're not project");

    return findProject;
  }

  public async findProjectById(ownedBy: string, projectId: string): Promise<Project> {
    if (isEmpty(projectId)) throw new HttpException(400, "You're not projectId");

    const findProject: Project = await this.projects.findOne({ ownedBy: ownedBy, _id: projectId });
    if (!findProject) throw new HttpException(409, "You're not project");

    return findProject;
  }

  public async createProject(projectData: CreateProjectDto): Promise<Project> {
    if (isEmpty(projectData)) throw new HttpException(400, "You're not projectData");

    const findProject: Project = await this.projects.findOne({ ownedBy: projectData.ownedBy, projectCode: projectData.projectCode });
    if (findProject) throw new HttpException(409, `You're email ${projectData.projectCode} already exists`);

    const createProjectData: Project = await this.projects.create({ ...projectData });

    return createProjectData;
  }

  public async updateProject(projectId: string, projectData: CreateProjectDto): Promise<Project> {
    if (isEmpty(projectData)) throw new HttpException(400, "You're not projectData");

    if (projectData.projectCode) {
      const findProject: Project = await this.projects.findOne({ ownedBy: projectData.ownedBy, projectCode: projectData.projectCode });
      if (findProject && findProject._id != projectId) throw new HttpException(409, `You're Project Code ${projectData.projectCode} already exists`);
    }

    const updateProjectById: Project = await this.projects.findByIdAndUpdate(projectId, projectData);
    if (!updateProjectById) throw new HttpException(409, "You're not project");

    return updateProjectById;
  }

  public async deleteProject(ownedBy: string, projectId: string): Promise<Project> {
    const deleteProjectById: Project = await this.projects.findByIdAndDelete({ ownedBy: ownedBy, _id: projectId });
    if (!deleteProjectById) throw new HttpException(409, "You're not project");

    return deleteProjectById;
  }
}

export default ProjectService;
