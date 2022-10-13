export class ServiceExceptionModel extends Error {
  moduleName: string;
  serviceName: string;
  functionName: string;
  constructor(
    moduleName,
    serviceName,
    functionName,
    message: string = 'Error in fetching service!',
  ) {
    super(message);
    this.moduleName=moduleName;
    this.serviceName=serviceName;
    this.functionName=functionName;
  }
}
