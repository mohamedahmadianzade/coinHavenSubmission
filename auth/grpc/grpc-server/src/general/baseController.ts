import { LoggerService } from '../logger/logger.service';
import { ServiceExceptionModel } from './serviceException.model';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserActivityLogModel } from '../logger/model/userActivityLog.model';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

/**
 * each controller are inhreted from base controller to have extra method for error handling and
 * make all service result with same structure
 *
 * @export
 * @class BaseController
 */
@Injectable()
export class BaseController {
  @Inject()
  loggerService: LoggerService;

  @Inject()
  configService: ConfigService;
  moduleName: string;
  serviceName: string;

  constructor(moduleName: string, serviceName: string) {
    this.moduleName = moduleName;
    this.serviceName = serviceName;
  }

  /**
   * log exception in log server via redis stream ( streamName=exception)
   * audit user activity in log server via redis stream ( streamName=useractivity)
   *
   *
   * @param {ServiceExceptionModel} error
   * @param {string} [functionName='']
   * @memberof BaseController
   */
  handleError(error: ServiceExceptionModel, functionName, params = null) {
    this.autitLog({
      requestResult: false,
      requestErrorMessage: error.message,
      functionName,
      params,
    });
    this.loggerService.exceptionLog(error);
    throw new RpcException(error.message);
  }

  /**
   * make all controllers method result with same structure
   * audit user activity log in  log server via redis stream ( streamName=useractivity)
   *
   * @param {*} message
   * @param {*} data
   * @param {string} [functionName='']
   * @return {*}
   * @memberof BaseController
   */
  controllerResult(message, data, functionName, params = null) {
    this.autitLog({
      requestResult: true,
      message,
      functionName,
      params,
    });
    return { data, message };
  }

  /**
   * send user log activity to log server via redis stream (streamName=useractivity)
   * informttion are collected from
   *  request object
   *  controller fields
   *  service result
   *
   * @param {*} data
   * @memberof BaseController
   */
  autitLog(data: any) {
    let userActivityLogModel = new UserActivityLogModel();
    userActivityLogModel.params = data.params;
    userActivityLogModel.microServiceName =
      this.configService.get('microServiceName');

    userActivityLogModel.description = data.message;
    userActivityLogModel.moduleName = this.moduleName;
    userActivityLogModel.serviceName = this.serviceName;
    userActivityLogModel.functionName = data.functionName;
    userActivityLogModel.requestResult = data.requestResult;
    userActivityLogModel.requestErrorMessage = data.requestErrorMessage;
    this.loggerService.auditLog(userActivityLogModel);
  }
}
