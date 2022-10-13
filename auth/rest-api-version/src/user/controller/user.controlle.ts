import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserInsertModel } from './model/userInsertModel.dto';
import { UserUpdateModel } from './model/userUpdateModel.dto';
import { UserService } from '../service/user.service';
import { UserIdModel } from './model/userIdModel.dto';
import { UserGetAllModel } from './model/userGetAllModel.dto';
import { BaseController } from '../../general/baseController';
import { JwtAuthGuard } from '../../auth/passport-strategy/jwt/jwt.auth.guard';
import { UsernameModel } from './model/userNameModel.dto';

@Controller('users')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super('user', 'userService');
  }
  @Get('')
  async getAll(@Req() req, @Query() userGetAllModel: UserGetAllModel) {
    try {
      let result = await this.userService.getAll(
        +userGetAllModel.pageNumber,
        +userGetAllModel.pageSize,
      );
      return this.controllerResult('', result, req, 'getAll');
    } catch (error) {
      this.handleError(error, req, 'getAll');
    }
  }

  @Get('/username/:username')
  async getByUsername(@Req() req, @Param() usernameModel: UsernameModel) {
    try {
      let result = await this.userService.getByUsername(usernameModel.username);
      if (!result) throw new Error('Username is not valid');
      return this.controllerResult('', result, req, 'username');
    } catch (error) {
      this.handleError(error, req,'username');
    }
  }
  @Get(':userId')
  async get(@Req() req, @Param() userGetModel: UserIdModel) {
    try {
      let result = await this.userService.getByUserId(userGetModel.userId);
      return this.controllerResult('', result, req, 'getByUserId');
    } catch (error) {
      this.handleError(error, req,'getByUserId');
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async delete(@Req() req, @Param() userDeleteModel: UserIdModel) {
    try {
      let result = await this.userService.delete(userDeleteModel.userId);
      return this.controllerResult(
        'Successfull User Delete Operation',
        result,
        req,
        'delete',
      );
    } catch (error) {
      this.handleError(error, req,  'delete');
    }
  }

  @Post()
  async insert(@Req() req, @Body() userInsertModel: UserInsertModel) {
    try {
      let result = await this.userService.insert(userInsertModel);
      return this.controllerResult(
        'Successfull User Registration Operation',
        result,
        req,
        'insert',
      );
    } catch (error) {
      this.handleError(error, req, 'insert');
    }
  }
  @Put(':userId')
  async update(
    @Req() req,
    @Param() userIdModel: UserIdModel,
    @Body() userUpdateModel: UserUpdateModel,
  ) {
    try {
      let result = await this.userService.update(
        userIdModel.userId,
        userUpdateModel,
      );
      return this.controllerResult(
        'Successfull User update  Operation',
        result,
        req,
        'update',
      );
    } catch (error) {
      this.handleError(error, req,'update');
    }
  }
}
