import { UserInsertModel } from './model/userInsertModel.dto';
import { UserUpdateModel } from './model/userUpdateModel.dto';
import { UserService } from '../service/user.service';
import { UserIdModel } from './model/userIdModel.dto';
import { UserGetAllModel } from './model/userGetAllModel.dto';
import { BaseController } from '../../general/baseController';
import { UsernameModel } from './model/userNameModel.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super('user', 'userService');
  }
  @GrpcMethod('UserController', 'getAll')
  async getAll(userGetAllModel: UserGetAllModel) {
    try {
      let result = await this.userService.getAll(
        +userGetAllModel.pageNumber,
        +userGetAllModel.pageSize,
      );
      return this.controllerResult('', result, 'getAll',userGetAllModel);
    } catch (error) {
      this.handleError(error, 'getAll',userGetAllModel);
    }
  }

  @GrpcMethod('UserController', 'get')
  async get(userGetModel: UserIdModel) {
    try {
      let result = await this.userService.getByUserId(userGetModel.userId);
      return this.controllerResult('', result, 'getByUserId',userGetModel);
    } catch (error) {
      this.handleError(error, 'getByUserId',userGetModel);
    }
  }
  @GrpcMethod('UserController', 'delete')
  async delete(userDeleteModel: UserIdModel) {
    try {
      let result = await this.userService.delete(userDeleteModel.userId);
      return this.controllerResult(
        'Successfull User Delete Operation',
        result,
        'delete',
        userDeleteModel
      );
    } catch (error) {
      this.handleError(error, 'delete',userDeleteModel);
    }
  }
  @GrpcMethod('UserController', 'insert')
  async insert(userInsertModel: UserInsertModel) {
    try {
      let result = await this.userService.insert(userInsertModel);
      return this.controllerResult(
        'Successfull User Registration Operation',
        result,
        'insert',
        userInsertModel
      );
    } catch (error) {
      this.handleError(error, 'insert',userInsertModel);
    }
  }

  @GrpcMethod('UserController', 'username')
  async getByUsername(usernameModel: UsernameModel) {
    try {
      let result = await this.userService.getByUsername(usernameModel.username);
      if (!result) throw new Error('Username is not valid');
      return this.controllerResult('', result, 'username',usernameModel);
    } catch (error) {
      this.handleError(error, 'username',usernameModel);
    }
  }
  @GrpcMethod('UserController', 'update')
  async update(userUpdateModel: UserUpdateModel) {
    try {
      let result = await this.userService.update(
        userUpdateModel.userId,
        userUpdateModel,
      );
      return this.controllerResult(
        'Successfull User update  Operation',
        result,
        'update',
        userUpdateModel
      );
    } catch (error) {
      this.handleError(error, 'update',userUpdateModel);
    }
  }
}
