import { NextFunction, Request, Response } from 'express';

import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'Sign-up Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      // const storage = this.getLocalStorage();
      // storage.setItem(findUser.email, JSON.stringify(findUser));

      res.setHeader('Set-Cookie', [cookie]);
      res.setHeader('Allow-Origin-With-Credentials', 'true');
      res.status(200).json({ data: findUser, message: 'Login Successfully', authentication: cookie });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.setHeader('Allow-Origin-With-Credentials', 'true');
      res.status(200).json({ data: logOutUserData, message: 'Logout Successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
