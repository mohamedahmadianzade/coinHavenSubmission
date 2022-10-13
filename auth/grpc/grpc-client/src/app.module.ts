import { Module, NestModule, Logger, MiddlewareConsumer } from '@nestjs/common';
import { RequestMiddleware } from './middleware/request.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule ,
    AuthModule
  ],
})
export class AppModule implements NestModule {
  private logger: Logger;
  constructor(private configService: ConfigService) {
    this.logger = new Logger();
    console.log('-----------------------------');
    this.logger.log(
      `${this.configService.get('microServiceName')} started !!!`,
    );
    console.log('-----------------------------');
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
