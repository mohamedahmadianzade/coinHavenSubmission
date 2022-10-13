import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGetAllOutputModel } from './model/getAll/userGetAllOutput.model';
import { UserService } from '../user.service';
import { UserInsertInputModel } from './model/insert/UserInsertInput.model';
import { UserGetByIdOutputModel } from './model/getById/userGetByIdOutput.model';
import { UserInsertOutputModel } from './model/insert/userInsertOutput.model';
import { UserModel } from './model/user.model';
import { UserGetAllOutputDataModel } from './model/getAll/userGetAllOutputData.model';
@Resolver((of) => UserModel)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => UserGetByIdOutputModel, { name: 'getByUserId' })
  async getByUserId(@Args('userId') userId: string) {
    let result = await this.userService.getByUserId(userId);
    return result;
  }

  @Query((returns) => UserGetAllOutputModel, { name: 'getAll' })
  async getAll(@Args('id') id: string) {
    let result =await this.userService.getAll();
    return result;
  }

  @Mutation((returns) => UserInsertOutputModel)
  async insert(@Args() userInputModel: UserInsertInputModel) {
    return this.userService.insert(userInputModel);
  }
}
