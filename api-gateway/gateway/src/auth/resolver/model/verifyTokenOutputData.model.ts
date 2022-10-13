import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifyTokenOutputDataModel {
  @Field()
  token: string;
  @Field()
  message: string;
}
