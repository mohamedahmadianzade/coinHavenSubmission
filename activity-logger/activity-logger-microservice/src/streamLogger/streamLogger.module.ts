import {Module} from '@nestjs/common'
import { StreamLoggerController } from './controller/streamLogger.controller';
import { ExceptionEntity } from './service/model/exception.entity';
import { StreamLoggerService } from './service/streamLogger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivityEntity } from './service/model/userActivity.entity';

@Module({
    imports:[TypeOrmModule.forFeature([UserActivityEntity , ExceptionEntity])],
    controllers:[StreamLoggerController],
    providers:[StreamLoggerService]

})
export class StreamLoggerModule
{

}