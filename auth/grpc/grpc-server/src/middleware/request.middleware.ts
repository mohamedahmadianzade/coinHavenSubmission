import { NestMiddleware, Logger, Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private logger: Logger;
  constructor(
  ) {
    this.logger = new Logger('Request Logging');
  }
  use(req: Request, res: Response, next: (error?: any) => void) {
    this.logForDebugging(req);
    next();
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
