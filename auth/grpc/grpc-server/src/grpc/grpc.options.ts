import { ConfigService } from '@nestjs/config';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
const configService = new ConfigService();
export const GrpcOptions: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: configService.get('GRPC_PACKAGE'),
    protoPath: join(__dirname, 'user.proto'),
    url: configService.get('GRPC_ADDRESS'),
  },
};
