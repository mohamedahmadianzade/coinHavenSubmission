import { Metadata } from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GrpcOptions } from '../grpc/grpc.options';
import { UserLoginInputModel } from './resolver/model/userLoginInput.model';
@Injectable()
export class AuthService implements OnModuleInit {
  @Client(GrpcOptions)
  private client: ClientGrpc;
  private grpcAuthController: any;
  
  onModuleInit() {
    this.grpcAuthController = this.client.getService<any>('AuthController');
  }

  async login(userLoginInputModel: UserLoginInputModel) {
    let result= await this.grpcAuthController.login(userLoginInputModel).toPromise();
    return result;
  }
  async me(token:string) {
    let metadata = new Metadata();
  metadata.add('token', token);
    let result= await this.grpcAuthController.me(null,metadata).toPromise();
    return result;
  }
  async verifyToken(token: string) {
    let result= await this.grpcAuthController.verifyToken({token}).toPromise();
    return result;
  }
}
