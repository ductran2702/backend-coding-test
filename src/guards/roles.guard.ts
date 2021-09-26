import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserEntity } from '../modules/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: roles.guard.ts ~ line 18 ~ RolesGuard ~ canActivate ~ request',
      request,
    );
    const user = <UserEntity>request.user;
    console.log(
      '🚀 ~ file: roles.guard.ts ~ line 19 ~ RolesGuard ~ canActivate ~ user',
      user,
    );

    return roles.includes(user.role);
  }
}
