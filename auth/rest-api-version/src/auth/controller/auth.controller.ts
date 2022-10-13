import {
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Body,
  Req,
  HttpCode,
} from '@nestjs/common';
import { BaseController } from '../../general/baseController';
import { AuthService } from '../service/auth.service';
import { JwtAuthGuard } from '../passport-strategy/jwt/jwt.auth.guard';
import { localAuthGuard } from '../passport-strategy/local/local.auth.guard';
import { VerifyTokenModel } from './model/verifyToken.model';
import { LoginModel } from './model/login.model';

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
  async login(@Req() req, @Body() loginModel: LoginModel) {
    return this.controllerResult(
      'Welcome to our System',
      this.authService.generateJwtToken(req.user),
      req,
      'login',
    );
  }

  /**
   *
   * without using passport module, simple authentication and generating token password
   * @param {LoginModel} loginModel
   * @param {*} req
   * @return {*}
   * @memberof AuthController
   */
  @Post('loginType2')
  async loginType2(@Body() loginModel: LoginModel, @Req() req) {
    try {
      let userInfo = await this.authService.loginType2(
        loginModel.username,
        loginModel.password,
      );

      return this.controllerResult(
        'welcome to our system',
        userInfo,
        req,
        'login',
      );
    } catch (error) {
      this.handleError(error, req, 'login');
    }
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
      'me',
    );
  }

  /**
   *Get user information from jwt token without using passpost module jwt strategy and using guard
   *
   * @param {*} req
   * @return {*}
   * @memberof AuthController
   */
  @Get('meType2')
  async meType2(@Req() req) {
    try {
      let userInfo = await this.authService.meType2(req.headers);
      return this.controllerResult('User Profile', userInfo, req, 'meType2');
    } catch (error) {
      this.handleError(error, req, 'meType2');
    }
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
    return this.controllerResult('', result, req, 'me');
  }

  
}
