process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';

import validateEnv from '@utils/validateEnv';

import App from '@app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import IndexPageRoute from '@routes/page/index.page.route';
import LoginPageRoute from '@routes/page/login.page.route';
import ClientsRoute from '@routes/clients.route';

validateEnv();

const Routes = [];

// API Routes
Routes.push(new IndexRoute());
Routes.push(new UsersRoute());
Routes.push(new AuthRoute());
Routes.push(new ClientsRoute());

// Page Routes
Routes.push(new IndexPageRoute());
Routes.push(new LoginPageRoute());
const app = new App(Routes);

app.listen();
