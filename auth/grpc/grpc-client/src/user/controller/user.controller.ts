import {
  Controller,
  Get,
  Param,
  Query,
  Delete,
  Put,
  Post,
  Body,
} from '@nestjs/common';
import { BaseController } from 'src/general/baseController';
import { UserService } from '../user.service';
import { UserGetAllModel } from './model/userGetAllModel.dto';
import { UserIdModel } from './model/userIdModel.dto';
import { UserInsertModel } from './model/userInsertModel.dto';
import { UsernameModel } from './model/usernameModel.dto';
import { UserUpdateModel } from './model/userUpdateModel.dto';
@Controller('users')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super('UserModule', 'userService');
  }
  @Get('')
  async getAll(
    @Query()
    userGetAllModel: UserGetAllModel,
  ) {
    try {
      let result =await  this.userService.getAll(
        userGetAllModel.pageNumber,
        userGetAllModel.pageSize,
      );
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
  @Get(':userId')
  async getById(@Param() userGetModel: UserIdModel) {
    try {
      let result = await this.userService.getById(userGetModel);
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
  @Get('username/:username')
  async getByUsername(@Param() usernameModel: UsernameModel) {
    try {
      let result =await  this.userService.getByUsername(usernameModel);
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
  @Delete(':userId')
  async delete(@Param() userIdModel: UserIdModel) {
    try {
      let result =await  this.userService.delete(userIdModel);
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
  @Post('')
  async insert(@Body() userInputModel: UserInsertModel) {
    try {
      let result =await  this.userService.insert(userInputModel);
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() userUpdateModel: UserUpdateModel,
  ) {
    try {
      let result =await  this.userService.update(userId, userUpdateModel);
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
}
