import { Module, NestModule, Logger, MiddlewareConsumer } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './user.service';


@Module({
    controllers:[UserController],
    providers:[UserService] ,
    exports :[UserService]
})
export class UserModule
{
}