import { NestMiddleware, Logger, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../logger/logger.service';
import { UserActivityLogModel } from '../logger/model/userActivityLog.model';
import { Request, Response } from 'express';
@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private logger: Logger;
  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
  ) {
    this.logger = new Logger('Request Logging');
  }
  use(req: Request, res: Response, next: (error?: any) => void) {
    this.logForDebugging(req);
    this.getInformationFromRequestForLogging(req);
    next();
  }

  /**
   * Extract information from request and append as a single object (requestModel) to request object agian.
   * The reason I do not send activity log from here to Log server is that I need more extra informations
   * such as modulename,functionnname,servicename,request result,request error message and...
   * these informations are note available here so we audit log and send to log server in controller
   *
   * @private
   * @param {*} req
   * @memberof RequestMiddleware
   */
  private getInformationFromRequestForLogging(req) {
    let userActivityLog = new UserActivityLogModel();
    userActivityLog.httpVerb = req.method;
    userActivityLog.ipAddress = req.ip;
    userActivityLog.params =
      Object.keys(req.body).length != 0 ? req.body : undefined;
    userActivityLog.microServiceName = this.configService.get('microServiceName');
    userActivityLog.url = req.originalUrl;
    req.userActivityLog = userActivityLog;
  }

  /**
   * Just log request information on console for better debuging purpose
   *
   * @private
   * @param {*} req
   * @memberof RequestMiddleware
   */
  private logForDebugging(req: Request) {
    console.log();
    this.logger.log(`${req.method} ${req.baseUrl} `);
    if (Object.keys(req.body).length) this.logger.log(req.body);
    console.log();
  }
}
