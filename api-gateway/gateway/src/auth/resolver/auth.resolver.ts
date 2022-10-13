import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from 'src/user/resolver/model/user.model';

import { AuthService } from '../auth.service';
import { MeOutputModel } from './model/meOutput.model';
import { UserLoginInputModel } from './model/userLoginInput.model';
import { UserLoginOutputModel } from './model/userLoginOutput.model';
import { VerifyTokenOutputModel } from './model/verifyTokenOutput.model';
@Resolver((of) => UserModel)
export class AuthResolver {
  constructor(private authSevice: AuthService) {}

  @Query((returns) => UserLoginOutputModel, { name: 'login' })
  async login(@Args() userLoginInputModel: UserLoginInputModel) {
    let result = await this.authSevice.login(userLoginInputModel);
    return result;
  }

  @Query((returns) => MeOutputModel, { name: 'me' })
  async me(@Args("token") token:string) {
    let result = await this.authSevice.me(token);
    return result;
  }

  @Query((returns) => VerifyTokenOutputModel, { name: 'verifyToken' })
  async verifyToken(@Args('token') token: string) {
    let result = await this.authSevice.verifyToken(token);
    return result;
  }
}
