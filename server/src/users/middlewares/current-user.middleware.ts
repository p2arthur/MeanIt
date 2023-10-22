import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '@prisma/client';

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
    const { wallet_address } = req.session || {};

    if (!wallet_address) {
      throw new NotFoundException();
    }

    const user = await this.usersService.find(wallet_address);
    req.currentUser = user;

    next();
  }
}
