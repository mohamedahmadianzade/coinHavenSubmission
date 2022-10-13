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
  users: any[] = [
    {
      userId: '1',
      username: '1',
      fullName: 'Mohamed Ahmadian',
      email: 'a@a.com',
      password: '1',
    },
    {
      userId: '2',
      username: '2',
      fullName: 'Ali bagheri',
      email: 'b@b.com',
      password: '2',
    },
  ];
  constructor() {}

  async getAll() {
    return this.grpcUserController.getAll({
      pageNumber: 1,
      pageSize: 10,
    });
  }
  async getByUserId(userId) {
    return this.grpcUserController.get({ userId });
  }
  async delete(userId) {}
  async update(userId) {}
  async insert(data) {}
}
