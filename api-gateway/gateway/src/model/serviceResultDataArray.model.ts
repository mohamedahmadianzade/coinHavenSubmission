import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
@ObjectType()
export class ServiceResultDataArrayModel {
  @Field()
  message: string;
  @Field(() => [User])
  data: any;
}
