export class UserActivityLogModel {
  createdAt: string = new Date().toISOString();
  url: string;
  params: string;
  httpVerb: string = 'unKnown';
  ipAddress: string = 'unKnown';
  description: string = '';
  userId: string = 'UnKnown';
  requestResult: string = 'true';
  requestErrorMessage: string;

  /**
   * the name of the microservice
   *
   * @type {string}
   * @memberof UserActivityLogModel
   */
  microServiceName: string;

  moduleName: string;
  serviceName: string;
  functionName: string;
}
