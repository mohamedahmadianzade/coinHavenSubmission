import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserGetAllOutputModel } from './model/getAll/userGetAllOutput.model';
import { UserService } from '../user.service';
import { UserInsertInputModel } from './model/insert/userInsertInput.model';
import { UserGetByIdOutputModel } from './model/getById/userGetByIdOutput.model';
import { UserInsertOutputModel } from './model/insert/userInsertOutput.model';
import { UserModel } from './model/user.model';
import { UserDeleteOutputModel } from './model/delete/userDeleteByIdOutput.model';
import { UserUpdateOutputModel } from './model/update/userUpdateOutput.model';
import { UserUpdateInputModel } from './model/update/userUpdateInput.model';
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
    let result = await this.userService.getAll();
    return result;
  }

  @Mutation((returns) => UserInsertOutputModel)
  async insert(@Args() userInputModel: UserInsertInputModel) {
    let result = await this.userService.insert(userInputModel);
    return result;
  }
  @Mutation((returns) => UserDeleteOutputModel)
  async delete(@Args('userId') userId: string) {
    let result = await this.userService.delete(userId);
    return result;
  }

  @Mutation((returns) => UserUpdateOutputModel)
  async update(@Args() userUpdateInputModel: UserUpdateInputModel) {
    let result = await this.userService.update(userUpdateInputModel);
    return result;
  }
}
