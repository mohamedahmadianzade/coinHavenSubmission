export class ExceptionLogModel {
  createdAt: string;
  message: string;
  stack: string;
  serviceName: string;
  functionName: string;
  moduleName: string;
  constructor(error: any) {
    this.moduleName = error.moduleName;
    this.serviceName = error.serviceName;
    this.functionName = error.functionName;
    this.message = error.message;
    this.stack = error.stack;
    this.createdAt = new Date().toISOString();
  }
}
