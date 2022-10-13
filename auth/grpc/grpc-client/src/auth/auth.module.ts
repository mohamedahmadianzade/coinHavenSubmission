import { Module, NestModule, Logger, MiddlewareConsumer } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[UserModule]
})
export class AuthModule {}
