import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { forwardRef, Module } from '@nestjs/common';
//import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    FirebaseAdminModule,
    //PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService], //, JwtStrategy],
  exports: [AuthService], //[PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
})
export class AuthModule {}
