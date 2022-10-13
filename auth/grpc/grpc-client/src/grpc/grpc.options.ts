import { Transport } from '@nestjs/microservices';
import { join } from 'path';

export const GrpcOptions: any = {
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: join(__dirname, 'user.proto'),
    url: 'localhost:5004',
  },
};


