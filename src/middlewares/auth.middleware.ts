import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@models/users.model';

class AuthMiddleware {
  public validate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;

      if ((cookies && cookies.Authorization) || req.headers['authorization']) {
        let findUser;

        if (cookies.Authorization) {
          findUser = await this.validateUser(cookies.Authorization);
        } else if (req.headers['authorization']) {
          findUser = await this.validateUser(req.headers['authorization']);
        }

        if (findUser) {
          req.user = findUser;
          req['userId'] = findUser._id.toString();
          next();
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      } else {
        next(new HttpException(401, 'Authentication token missing'));
      }
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  };

  public validateUser = async (cookies: string) => {
    const secretKey: string = process.env.SECRETKEY;
    const verificationResponse = (await jwt.verify(cookies, secretKey)) as DataStoredInToken;
    const userId = verificationResponse._id;
    const findUser = await userModel.findById(userId);

    return findUser;
  };
}

export default AuthMiddleware;
