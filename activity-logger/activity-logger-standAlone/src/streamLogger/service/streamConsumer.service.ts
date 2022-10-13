import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StreamLoggerService } from './streamLogger.service';
const nrs = require('node-redis-streams');
const Redis = require('ioredis');

@Injectable()
export class StreamCosumerService {
  private reader;
  logger: Logger;
  constructor(
    private configService: ConfigService,
    private streamLoggerService: StreamLoggerService,
  ) {
    this.reader = new Redis({
      port: this.configService.get('REDIS_PORT'),
      host: this.configService.get('REDIS_HOST'),
    });
    this.logger = new Logger('StandAlone StreamLoggerService');
  }
  private streamActivityConsumer;
  private streamExceptionConsumer;
  createConsumer(streamName) {
    return new nrs.Consumer({
      consumerName:
        this.configService.get('REDIS_CONSUMER_NAME') + '-' + streamName,
      groupName: this.configService.get('REDIS_CONSUMER_GROUP'),
      readItems: 50,
      recordHandler: async (record) => {
        console.log();
        this.logger.log(`StreamName: ${streamName} -- Recieved new Data`);
        if (streamName == 'useractivity')
          this.streamLoggerService.logActivity(record);
        else this.streamLoggerService.logException(record);
      },
      errorHandler: async (record) => {
        console.log('ERROR DETECTED FOR RECORD', record);
      },
      redisClient: this.reader,
      streamName,
      blockIntervalMS: 1000,
      checkAbandonedMS: 2000,
    });
  }

  /**
   * create 2 consumer for listening all data inserted to redis stream
   *  1- useracitivity for all user activity in our client
   *  2- exception for all error occured in our client
   *
   * Note: the consumer name and consumer group should exist before running the application
   * @memberof StreamCosumerService
   */
  startListening() {
    this.streamActivityConsumer = this.createConsumer(
      this.configService.get('REDIS_STREAM_ACTIVITY_NAME'),
    );
    this.streamExceptionConsumer = this.createConsumer(
      this.configService.get('REDIS_STREAM_EXCEPTION_NAME'),
    );
    this.streamActivityConsumer.StartConsuming();
    this.streamExceptionConsumer.StartConsuming();
    this.printLog();
  }
  private printLog() {
    console.log('----------');
    this.logger.verbose(
      `Stream ${this.configService.get(
        'REDIS_STREAM_ACTIVITY_NAME',
      )} created and started consuming!`,
    );
    console.log('----------');
    console.log();
    console.log('----------');
    this.logger.verbose(
      `Stream ${this.configService.get(
        'REDIS_STREAM_EXCEPTION_NAME',
      )} created and started consuming!`,
    );
    console.log('----------');
    console.log();
  }
}
