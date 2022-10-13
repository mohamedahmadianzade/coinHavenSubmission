import { Field, ObjectType } from '@nestjs/graphql';
import { VerifyTokenOutputDataModel } from './verifyTokenOutputData.model';

@ObjectType()
export class VerifyTokenOutputModel {
  @Field()
  message: string;
  @Field((type) => VerifyTokenOutputDataModel)
  data: VerifyTokenOutputDataModel;
}
