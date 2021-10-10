import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';

import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class firebaseAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly firebaseAuth: FirebaseAuthenticationService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.token;
    if (tokenHeader) {
      const token = tokenHeader.toString();

      try {
        const decodedToken = await this.firebaseAuth.verifyIdToken(token);
        const user = await this.userService.findByUsernameOrEmail({
          email: decodedToken.email,
        });
        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }
        req.user = user;
        next();
      } catch (error) {
        throw new HttpException(
          'Authentication error.',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
