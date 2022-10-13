import { Injectable, Logger } from '@nestjs/common';
import { UserActivityLogModel } from '../controller/model/userActivityLog.model';
import { ExceptionLogModel } from '../controller/model/exceptionLog.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionEntity } from './model/exception.entity';
import { Repository } from 'typeorm';
import { UserActivityEntity } from './model/userActivity.entity';

@Injectable()
export class StreamLoggerService {
  private logger: Logger;
  constructor(
    @InjectRepository(ExceptionEntity)
    private exceptionRepository: Repository<ExceptionEntity>,
    @InjectRepository(UserActivityEntity)
    private userActivityRepository: Repository<UserActivityEntity>,
  ) {
    this.logger = new Logger('StreamLoggerService');
  }

  async logActivity(userActivityLogModel: UserActivityLogModel) {
    this.userActivityRepository.insert(userActivityLogModel);
    this.logger.verbose(
      'LogActivity - > Activity Log stored in database(collection activity)',
    );
  }
  async logException(exceptionLogModel: ExceptionLogModel) {
    this.exceptionRepository.insert(exceptionLogModel);
    this.logger.verbose(
      'LogException - > exception Log stored in database(collection exception)',
    );
  }
}
