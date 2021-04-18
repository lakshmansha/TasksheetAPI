process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';

import validateEnv from '@utils/validateEnv';

import App from '@app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import ClientsRoute from '@routes/clients.route';
import ProjectsRoute from '@routes/projects.route';
import TasksRoute from '@routes/tasks.route';

import IndexPageRoute from '@routes/page/index.page.route';
import LoginPageRoute from '@routes/page/login.page.route';

validateEnv();

const Routes = [];

// API Routes
Routes.push(new IndexRoute());
Routes.push(new UsersRoute());
Routes.push(new AuthRoute());
Routes.push(new ClientsRoute());
Routes.push(new ProjectsRoute());
Routes.push(new TasksRoute());

// Page Routes
Routes.push(new IndexPageRoute());
Routes.push(new LoginPageRoute());
const app = new App(Routes);

app.listen();
