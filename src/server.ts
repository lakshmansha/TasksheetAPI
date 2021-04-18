process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import IndexPageRoute from '@routes/page/index.page.route';
import LoginPageRoute from '@routes/page/login.page.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const Routes = [];

// API Routes
Routes.push(new IndexRoute());
Routes.push(new UsersRoute());
Routes.push(new AuthRoute());

// Page Routes
Routes.push(new IndexPageRoute());
Routes.push(new LoginPageRoute());
const app = new App(Routes);

app.listen();
