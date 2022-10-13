import { Logger, Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { StreamLoggerModule } from './streamLogger/streamLogger.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('USERNAME'),
        password: configService.get('PASSWORD'),
        database: configService.get('DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get('SYNCRONIZE'),
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    StreamLoggerModule
  ],
})
export class AppModule {
  private logger:Logger;
  constructor(private configService:ConfigService)
  {
    this.logger= new Logger()
    console.log("-----------------------------");
    this.logger.log(`${this.configService.get("microServiceName")} started !!!`)
    console.log("-----------------------------");
  }
}
