import { LoggerService } from '../logger/logger.service';
import { ServiceExceptionModel } from './serviceException.model';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserActivityLogModel } from '../logger/model/userActivityLog.model';

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
  moduleName: string;
  serviceName: string;

  constructor(moduleName: string, serviceName: string) {
    this.moduleName = moduleName;
    this.serviceName = serviceName;
  }

  /**
   * log exception in log server via redis stream ( streamName=exception)
   * get extra informtation from request object
   * audit user activity in log server via redis stream ( streamName=useractivity)
   *
   *
   * @param {ServiceExceptionModel} error
   * @param {*} req
   * @param {string} [functionName='']
   * @memberof BaseController
   */
  handleError(error: ServiceExceptionModel, req, functionName = '') {
    this.autitLog({
      requestResult: false,
      requestErrorMessage: error.message,
      req,
      functionName,
    });
    this.loggerService.exceptionLog(error);
    throw new HttpException(error.message, 400);
  }

  /**
   * make all controllers method result with same structure
   * audit user activity log in  log server via redis stream ( streamName=useractivity)
   *
   * @param {*} message
   * @param {*} data
   * @param {*} req
   * @param {string} [functionName='']
   * @return {*}
   * @memberof BaseController
   */
  controllerResult(message, data, req, functionName = '') {
    this.autitLog({
      requestResult: true,
      req,
      message,
      functionName,
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
    userActivityLogModel.httpVerb = data.req.userActivityLog.httpVerb;
    userActivityLogModel.ipAddress = data.req.ip;
    userActivityLogModel.params = data.req.userActivityLog.params;
    userActivityLogModel.url = data.req.userActivityLog.url;
    userActivityLogModel.userId = data.req.user?.userId;
    userActivityLogModel.microServiceName =
      data.req.userActivityLog.microServiceName;
    userActivityLogModel.description = data.message;
    userActivityLogModel.moduleName = this.moduleName;
    userActivityLogModel.serviceName = this.serviceName;
    userActivityLogModel.functionName = data.functionName;
    userActivityLogModel.requestResult = data.requestResult;
    userActivityLogModel.requestErrorMessage = data.requestErrorMessage;
    this.loggerService.auditLog(userActivityLogModel);
  }
}
