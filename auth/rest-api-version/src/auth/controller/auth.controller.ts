import {
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Body,
  Req,
  HttpCode
} from '@nestjs/common';
import { BaseController } from '../../general/baseController';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../passport-strategy/jwt/jwt.auth.guard';
import { localAuthGuard } from '../passport-strategy/local/local.auth.guard';
import { VerifyTokenModel } from './verifyToken.model';

/**
 * In this controller, I used passport module for Authentication mechanism via local and jwt strategy
 * by using UseGuard decorators, each route will use one of these strategy for authentucating.
 *
 * localStrategy excepts username and password to be sent via body of request and check user auth mechanism
 * by calling user service login method
 *
 * jwtStrategy got the token from request header params,validate it and make decoed json result to service for
 * doing extra action like getting full uesr information from database based the token userId
 * @export
 * @class AuthController
 */
@Controller('')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super('auth', 'AuthService');
  }

  /**
   *
   *@description user authenticated via username and pass via local strategy of passport module
   * @param {*} req
   * @return {*}
   * @memberof AuthController
   */
  @Post('login')
  @HttpCode(200)
  @UseGuards(localAuthGuard)
  async login(@Req() req) {
    return this.controllerResult(
      'Welcome to our System',
      this.authService.generateJwtToken(req.user),
      req,
      'login'
    );
  }

  /**
   *
   * @description user should pass jwt token via header Authorization tag and will
   *              be authenticated by jwt startegy of passport module,
   *              by passing valid token,user information will be returned
   * @param {*} req
   * @return {*}
   * @memberof AuthController
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req) {
    return this.controllerResult(
      'User profile Information',
      {
        userInfo: req.user,
      },
      req,
      'me'
    );
  }

  /**
   *
   *@description verify user token sent via body parameter by nestjs/jwt service
   *
   * @param {VerifyTokenModel} verifyTokenModel
   * @return {*}
   * @memberof AuthController
   */
  @Post('verifyToken')
  async verify(@Req() req, @Body() verifyTokenModel: VerifyTokenModel) {
    let result = await this.authService.verifyJwtToken(
      verifyTokenModel.access_token,
    );
    return this.controllerResult('', result, req,'me');
  }


  @Get()
  welcome(){
    return "Welcome to system"
  }
}
