import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ExceptionLogModel } from './model/exceptionLog.model';
import { UserActivityLogModel } from './model/userActivityLog.model';
import { StreamLoggerService } from '../service/streamLogger.service';



/**
   * The module "@mark_hoog/redis-streams-transport" is responsible for getting data from 
   *   redis stream.it will take a consumer name at startup and will create a consumer group  so we can have scalable 
   *   artichecture by running multiple instance of this nest appliation.
   *   Each nest application consumer will connect to same consumer group so each message will processed once
   *   by a consumer in consumer group and it will result scalability and good performance and speed
   *   in getting log data from our client
 * @export
 * @class StreamLoggerController
 */
@Controller()
export class StreamLoggerController {
  logger: Logger;
  constructor(private streamLoggerService: StreamLoggerService) {
    this.logger = new Logger();
  }

  
  /**
   * Get all user activity in application via redis stream (streamName=useractivity)
   * All clients should send their user activity information via redis stream.
   * we collecting information about 
   *  request details like ip, verb and ..
   *  fail or success result of each activity
   *  full detailed information about running code like the modulename,servicename and function name
   * 
   * if user send jwt token via header properties, we can have information about user activities by userId
   * in each record, so we can analysis user activities grouped by user identifier.
   * @param {UserActivityLogModel} userActivityLogModel
   * @memberof StreamLoggerController
   */
  @EventPattern('useractivity')
  getUserActivity(userActivityLogModel: UserActivityLogModel) {
    console.log();
    this.logger.log(`StreamName: useractivity -- Recieved new Data`);
    this.streamLoggerService.logActivity(userActivityLogModel);
  }




  /**
   * Get all application exception via redis stream (streamName=exception) and store them in exception collection in database
   * All clients should send their exceptions information via redis stream.
   * we have information about failures  in user activity collection but we had extra information here like stack
   * and we can take good analysis from failures in the application.
   * @param {ExceptionLogModel} data
   * @memberof StreamLoggerController
   */
  @EventPattern('exception')
  getException(data: ExceptionLogModel) {
    console.log();
    this.logger.log(`StreamName: exception -- Recieved new Data`);
    this.streamLoggerService.logException(data);
  }
}
