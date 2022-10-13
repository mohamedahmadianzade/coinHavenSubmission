import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GrpcOptions } from '../grpc/grpc.options';
import { LoginModel } from './controller/model/login.model';
import { from } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { Metadata } from '@grpc/grpc-js';
import { VerifyTokenModel } from './controller/model/verifyToken.model';
@Injectable()
export class AuthService implements OnModuleInit {
  @Client(GrpcOptions)
  private client: ClientGrpc;
  private grpcAuthController: any;

  constructor() {}

  onModuleInit() {
    this.grpcAuthController = this.client.getService<any>('AuthController');
  }

  async login(loginModel: LoginModel) {
    return this.grpcAuthController.login(loginModel).toPromise();
  }
  async me(header) {
    let token = this.getTokenFromHeader(header);
    let metadata = new Metadata();
    metadata.add('token', token);
    return this.grpcAuthController.me(null, metadata).toPromise();
  }

  async verifyToken(verifyTokenModel: VerifyTokenModel) {
    return this.grpcAuthController
      .verifyToken({ token: verifyTokenModel.access_token })
      .toPromise();
  }

  private getTokenFromHeader(header) {
    if (!header.hasOwnProperty('authorization'))
      throw new Error(
        'Please provide jwt token in header field(authorization)',
      );
    return header.authorization;
  }
}
