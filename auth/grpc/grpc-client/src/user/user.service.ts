import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GrpcOptions } from '../grpc/grpc.options';

@Injectable()
export class UserService implements OnModuleInit {
  @Client(GrpcOptions)
  private client: ClientGrpc;
  private grpcUserController: any;

  onModuleInit() {
    this.grpcUserController = this.client.getService<any>('UserController');
  }

  async getAll(pageNumber, pageSize) {
    return this.grpcUserController
      .getAll({
        pageNumber,
        pageSize,
      })
      .toPromise();
  }
  async getById(userIdModel) {
    return this.grpcUserController.get(userIdModel).toPromise();
  }
  async getByUsername(usernameModel) {
    return this.grpcUserController.username(usernameModel).toPromise();
  }
  async delete(userIdModel) {
    return this.grpcUserController.delete(userIdModel).toPromise();
  }
  async insert(userCreateModel) {
    return this.grpcUserController.insert(userCreateModel).toPromise();
  }
  async update(userId, userUpdateModel) {
    return this.grpcUserController
      .update({ ...userUpdateModel, userId })
      .toPromise();
  }
}
