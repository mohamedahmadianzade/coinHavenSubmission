import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
@ObjectType()
export class ServiceResultDataObjectModel {
  @Field()
  message: string;
  @Field(() => User)
  data: User;
}
