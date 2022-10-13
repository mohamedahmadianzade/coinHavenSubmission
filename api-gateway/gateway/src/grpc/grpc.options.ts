import { Transport } from '@nestjs/microservices';
import { join } from 'path';

export const GrpcOptions: any = {
  transport: Transport.GRPC,
  options: {
    package: 'authenticationservice',
    protoPath: join(__dirname, 'authenticationservice.proto'),
    url: 'localhost:5004',
  },
};


