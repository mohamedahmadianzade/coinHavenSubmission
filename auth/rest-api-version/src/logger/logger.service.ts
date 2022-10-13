import { RedisService } from '@liaoliaots/nestjs-redis';
import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { ServiceExceptionModel } from '../general/serviceException.model';
import { ExceptionLogModel } from './model/exceptionLog.model';
import { UserActivityLogModel } from './model/userActivityLog.model';

@Injectable()
export class LoggerService implements OnModuleInit {
  @Inject()
  private redisService: RedisService;
  private redis: Redis;
  private logger: Logger;
  constructor() {}
  async onModuleInit() {
    this.redis = this.redisService.getClient();
    this.logger = new Logger('Logger Service');
  }

  /**
   * send exceptions log to log server via redis stream
   * every exception occurs in application will be send to log server and stored in table exceptions
   * stream name is exception
   *
   * @param {ServiceExceptionModel} error
   * @memberof LoggerService
   */
  async exceptionLog(error: ServiceExceptionModel) {
    let exceptionLogModel = new ExceptionLogModel(error);

    this.redis.xadd(
      'exception',
      '*',
      'createdAt',
      exceptionLogModel.createdAt,
      'moduleName',
      exceptionLogModel.moduleName,
      'serviceName',
      exceptionLogModel.serviceName,
      'functionName',
      exceptionLogModel.functionName,
      'message',
      exceptionLogModel.message,
      'stack',
      exceptionLogModel.stack,
    );

    this.logger.warn(
      'Expection has send to log server via Redis Stream(exception stream)',
    );
  }

  /**
   * send user activity log to log server via redis stream
   * stream name is useractivity and all activity log will be send to this stream
   * in the log server we have consumer group with many consumers to store these information
   * in log server databbase
   *
   * @param {RequestLogModel} requestLogModel
   * @memberof LoggerService
   */
  async auditLog(userActivityLogModel: UserActivityLogModel) {
    await this.redis.xadd(
      'useractivity',
      '*',
      'createdAt',
      userActivityLogModel.createdAt.toString(),
      'microServiceName',
      userActivityLogModel.microServiceName,
      'moduleName',
      userActivityLogModel.moduleName,
      'serviceName',
      userActivityLogModel.serviceName,
      'functionName',
      userActivityLogModel.functionName,
      'httpVerb',
      userActivityLogModel.httpVerb,
      'url',
      userActivityLogModel.url,
      'requestResult',
      userActivityLogModel.requestResult.toString(),
      'ipAddress',
      userActivityLogModel.ipAddress,
      'description',
      userActivityLogModel.description,
      'userId',
      userActivityLogModel.userId,

      'requestErrorMessage',
      userActivityLogModel.requestErrorMessage,
      'params',
      JSON.stringify(userActivityLogModel.params),
    );

    this.logger.verbose(
      'activity log has sent to log server via Redis Stream(useractivity stream)',
    );
   
  }
}
