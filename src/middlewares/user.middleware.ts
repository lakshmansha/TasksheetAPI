import { NextFunction, Response } from 'express';
import { LocalStorage } from 'node-localstorage';

import config from 'config';
import jwt from 'jsonwebtoken';

import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@models/users.model';

const userMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies;

    if (cookies && cookies.Authorization) {
      const secretKey: string = process.env.SECRETKEY;
      const verificationResponse = (await jwt.verify(cookies.Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    res.redirect('/login');
  }
};

const getLocalStorage = () => {
  if (typeof localStorage === 'undefined') {
    return new LocalStorage('./userStorage');
  } else {
    return localStorage;
  }
};

export default userMiddleware;
