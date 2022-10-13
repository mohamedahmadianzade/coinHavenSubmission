import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { localStrategy } from './passport-strategy/local/local.strategy';
import { JwtStrategy } from './passport-strategy/jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './service/model/token.entity';
@Module({
  providers: [AuthService, localStrategy, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWTSECRET'),
        signOptions: { expiresIn: '600s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
