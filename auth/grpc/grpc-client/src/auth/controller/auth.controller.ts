import {
  Controller,
  Get,
  Param,
  Query,
  Delete,
  Put,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { BaseController } from 'src/general/baseController';
import { AuthService } from '../auth.service';
import { LoginModel } from './model/login.model';
import { VerifyTokenModel } from './model/verifyToken.model';

@Controller('')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super('AuthModule', 'authService');
  }

  @Post('login')
  async insert(@Body() loginModel: LoginModel) {
    try {
      let res = await this.authService.login(loginModel);
      return res;
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get('me')
  async getProfile(@Req() request) {
    try {
      let res = await this.authService.me(request.headers);
      return res;
    } catch (error) {
      this.handleError(error);
    }
  }


  @Post('verifyToken')
  async verifyToken(@Body() verifyTokenModel: VerifyTokenModel) {
    try {
      let res = await this.authService.verifyToken(verifyTokenModel);
      return res;
    } catch (error) {
      this.handleError(error);
    }
  }
  
}
