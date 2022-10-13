import { ServiceExceptionModel } from './serviceException.model';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

/**
 * each controller are inhreted from base controller to have extra method for error handling and
 * make all service result with same structure
 *
 * @export
 * @class BaseController
 */
@Injectable()
export class BaseController {
  moduleName: string;
  serviceName: string;

  constructor(moduleName: string, serviceName: string) {
    this.moduleName = moduleName;
    this.serviceName = serviceName;
  }

  /**
   *
   *
   * @param {ServiceExceptionModel} error
   * @param {*} req
   * @param {string} [functionName='']
   * @memberof BaseController
   */
  handleError(error: any ) {
    let message = error.details ? error.details : error.message ;
    
    throw new HttpException(message,400);
  }

  /**
   * make all controllers method result with same structure
   *
   * @param {*} message
   * @param {*} data
   * @param {*} req
   * @param {string} [functionName='']
   * @return {*}
   * @memberof BaseController
   */
  controllerResult(message, data) {
    return { data, message };
  }


}
