import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: any, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    console.log('middleware session', req.session);

    console.log('executing middleware');

    if (!userId) {
      console.log('no user id');
      throw new NotFoundException();
    }

    const user = await this.usersService.findOne(userId);
    req.currentUser = user;

    next();
  }
}
