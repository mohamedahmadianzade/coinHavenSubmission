import { ServiceExceptionModel } from './serviceException.model';

export class BaseService {
  moduleName: string;
  serviceName: string;

  constructor(moduleName: string, serviceName: string) {
    this.moduleName = moduleName;
    this.serviceName = serviceName;
  }


  /**
   * Raise Standard error and add extra informtation to exception object
   *
   * @param {*} serviceInfo
   * @param {string} message
   * @memberof BaseService
   */
  serviceError(functionName: string, message: string) {
    throw new ServiceExceptionModel(
      this.moduleName,
      this.serviceName,
      functionName,
      message,
    );
  }

}
