import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Author } from '../model/author.model';
import { AuthorsService } from '../service/author.service';
@Resolver((of) => Author)
export class AuthorsResolver {
  constructor(private authorsService: AuthorsService) {}

  @Query((returns) => Author, {name:"findByIdAuthor"})
  async findByIdAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }

  @Query((returns) => [Author] , {name:"findAllAuthor"})
  async findAllAuthor(@Args('id' , { type: () => Int }) id: number) : Promise<Author[]> {
    return this.authorsService.findAll();
  }

}
