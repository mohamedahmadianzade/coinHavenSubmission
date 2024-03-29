import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GrpcOptions } from '../grpc/grpc.options';
import { UserGetAllInputModel } from './resolver/model/getAll/userGetAllInput.model';
import { UserInsertInputModel } from './resolver/model/insert/userInsertInput.model';
import { UserUpdateInputModel } from './resolver/model/update/userUpdateInput.model';

@Injectable()
export class UserService implements OnModuleInit {
  @Client(GrpcOptions)
  private client: ClientGrpc;
  private grpcUserController: any;

  onModuleInit() {
    this.grpcUserController = this.client.getService<any>('UserController');
  }
  constructor() {}

  async getAll(userGetAllInputModel: UserGetAllInputModel) {
    return this.grpcUserController.getAll(userGetAllInputModel).toPromise();
  }
  async getByUserId(userId) {
    return this.grpcUserController.get({ userId }).toPromise();
  }
  async delete(userId) {
    return this.grpcUserController.delete({ userId }).toPromise();
  }
  async update(userUpdateInputModel: UserUpdateInputModel) {
    return this.grpcUserController.update(userUpdateInputModel).toPromise();
  }
  async insert(userInsertInputModel: UserInsertInputModel) {
    return this.grpcUserController.insert(userInsertInputModel).toPromise();
  }
}
