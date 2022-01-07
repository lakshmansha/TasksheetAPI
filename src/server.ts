import 'dotenv/config';

import validateEnv from '@utils/validateEnv';

import App from '@app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import ClientsRoute from '@routes/clients.route';
import ProjectsRoute from '@routes/projects.route';
import TasksRoute from '@routes/tasks.route';
import TrackersRoute from '@routes/trackers.route';
import ProfileRoute from '@routes/profile.route';
import ReportsRoute from '@routes/reports.route';
import { toBoolean } from '@utils/util';
import DashboardRoute from '@routes/dashboard.route';

validateEnv();

const Routes = [];

// API Routes
Routes.push(new IndexRoute());
Routes.push(new UsersRoute());
Routes.push(new AuthRoute());
Routes.push(new ClientsRoute());
Routes.push(new ProjectsRoute());
Routes.push(new TasksRoute());
Routes.push(new TrackersRoute());
Routes.push(new ProfileRoute());
Routes.push(new ReportsRoute());
Routes.push(new DashboardRoute());

const app = new App(Routes);

const IsAppInsights = toBoolean(process.env.ISAPPINSIGHTS);


if (IsAppInsights) {
    app.initializeAppinsights();
  }

app.listen();
