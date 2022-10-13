import { Args, Query, Resolver } from '@nestjs/graphql';
import { ServiceResultDataArrayModel } from 'src/model/serviceResultDataArray.model';
import { ServiceResultDataObjectModel } from 'src/model/serviceResultDataObject.model';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
@Resolver((of) => User)
export class UserResolver {
  constructor(private postService: UserService) {}

  @Query((returns) => ServiceResultDataObjectModel, { name: 'getByUserId' })
  async findByIdPost(@Args('userId') userId: string) {
    return this.postService.getByUserId(userId);
  }

  @Query((returns) => ServiceResultDataArrayModel, { name: 'getAll' })
  async findAllPost(@Args('id') id: string) {
    return this.postService.getAll();
  }
}
