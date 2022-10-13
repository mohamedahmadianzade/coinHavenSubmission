import {Module} from '@nestjs/common'
import { ExceptionEntity } from './service/model/exception.entity';
import { StreamLoggerService } from './service/streamLogger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivityEntity } from './service/model/userActivity.entity';
import { StreamCosumerService } from './service/streamConsumer.service';

@Module({
    imports:[TypeOrmModule.forFeature([UserActivityEntity , ExceptionEntity])],
    providers:[StreamLoggerService,StreamCosumerService]

})
export class StreamLoggerModule
{
    constructor(private streamCosumerService:StreamCosumerService){
        this.streamCosumerService.startListening()
    }

}