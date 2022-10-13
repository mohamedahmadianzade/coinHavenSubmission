import { BaseController } from '../../general/baseController';
import { AuthService } from '../service/auth.service';

import { LoginModel } from './model/login.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { VerifyTokenModel } from './model/verifyToken.model';

@Injectable()
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super('auth', 'AuthService');
  }


  /**
   * Authenticate user based on username and password field
   * Genrate JWT Token and send to user for authencticated user
   *
   * @param {LoginModel} loginModel
   * @return {*} 
   * @memberof AuthController
   */
  @GrpcMethod('AuthController', 'login')
  async login(loginModel: LoginModel) {
    try {
      let result = await this.authService.validateUser(loginModel);
      return this.controllerResult('', result, 'login', loginModel);
    } catch (error) {
      this.handleError(error, 'getAll', loginModel);
    }
  }



  /**
   * Show user profile based on jwt token sent in metaData object of grpc method
   * Throw error if token in not in metaData or token is not valid
   * @param {*} data
   * @param {Metadata} metadata
   * @return {*} 
   * @memberof AuthController
   */
  @GrpcMethod('AuthController', 'me')
  async me(data: any, metadata: Metadata) {
    try {
      let result = await this.authService.me(metadata.get('token'));
      return this.controllerResult('', result, 'me');
    } catch (error) {
      this.handleError(error, 'getAll');
    }
  }



  /**
   * vefiy token based on jwt structure and expiration time
   *
   * @param {VerifyTokenModel} verifyTokenModel
   * @return {*} 
   * @memberof AuthController
   */
  @GrpcMethod('AuthController', 'verifyToken')
  async verifyToken(verifyTokenModel: VerifyTokenModel) {
    try {
      let result = await this.authService.verifyToken(verifyTokenModel);
      return this.controllerResult('', result, 'verifyToken', verifyTokenModel);
    } catch (error) {
      this.handleError(error, 'getAll', verifyTokenModel);
    }
  }
}
