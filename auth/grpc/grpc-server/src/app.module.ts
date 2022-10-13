import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { LoggerModule } from './logger/logger.module';
import { RequestMiddleware } from './middleware/request.middleware';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        config: {
          host: configService.get('REDIS_HOST'),
          port: parseInt(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        autoLoadEntities:true,
        synchronize: configService.get('SYNCRONIZE'),
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
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
