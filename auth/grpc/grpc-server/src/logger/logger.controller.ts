import { Controller, Get } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('')
export class LoggerController {
    constructor(private logService:LoggerService){}

    @Get("logger")
    async logger()
    {
        return "this.logService.logToRedis(new LogModel())"
    }
}