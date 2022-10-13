import { Injectable } from '@nestjs/common';
import { UserInsertModel } from '../controller/model/userInsertModel.dto';
const bcrypt = require('bcrypt');
import { UserUpdateModel } from '../controller/model/userUpdateModel.dto';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { BaseService } from '../../general/baseService';
@Injectable()
export class UserService extends BaseService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super('UserModule', 'UserService');
  }

  private findQueryOption(pageNumber: number = 1, pageSize: number = 10) {
    let skip = (pageNumber - 1) * pageSize;
    return { skip, take: pageSize };
  }
  async getAll(pageNumber: number, pageSize: number) {
    let result: any[] = await this.userRepository.find(
      this.findQueryOption(pageNumber, pageSize),
    );
    result = this.optimizeObject(result);
    return result;
  }
  async getByUserId(userId: string) {
    let userInfo: any = await this.findUserById(userId);
    if (userInfo) userInfo = this.optimizeObject([userInfo])[0];
    return userInfo;
  }
  async getByUsername(username: string) {
    let userInfo: any = await this.userRepository.findOneBy({ username });
     return userInfo;
  }

  async insert(userInsertModel: UserInsertModel) {
    let userExist = await this.userRepository.findOneBy({
      username: userInsertModel.username,
    });
    if (userExist)
      this.serviceError(
        'insert',
        'username is used by others,please choose another one',
      );

    let user: UserEntity = new UserEntity();
    user.userId = uuid();
    user.email = userInsertModel.email;
    user.username = userInsertModel.username;
    user.password = bcrypt.hashSync(
      userInsertModel.password,
      +this.configService.get('BCRYPTSALT'),
    );
    user.fullName = userInsertModel.fullName;

    await this.userRepository.insert(user);
    return {
      userId: user.userId,
      username: user.username,
    };
  }
  async update(userId: string, user: UserUpdateModel) {
    let userInfo = await this.findUserById(userId);
    userInfo.fullName = user.fullName;
    userInfo.email = user.email ? user.email : userInfo.email;
    await this.userRepository.update({ userId }, userInfo);

    return {
      userId,
    };
  }
  async delete(userId: string) {
    let result = await this.userRepository.delete({ userId });
    if (result.affected == 0)
      this.serviceError(
        'delete',
        'userId is not valid,please choose another one',
      );
    return {
      userId,
    };
  }

  private async findUserById(userId: string) {
    let userInfo = await this.userRepository.findOneBy({
      userId,
    });
    if (!userInfo) this.serviceError('findUserById', 'user not found');
    return userInfo;
  }

  private optimizeObject(users: UserEntity[]) {
    let result = users.map((user) => {
      let { password, _id, ...userInfo } = user;
      return userInfo;
    });
    return result;
  }
}
