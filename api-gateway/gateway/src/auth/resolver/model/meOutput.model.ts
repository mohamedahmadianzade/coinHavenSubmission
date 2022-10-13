import { Field, ObjectType } from '@nestjs/graphql';
import { MeOutputDataModel } from './meOutputData.model';

@ObjectType()
export class MeOutputModel {
  @Field()
  message: string;
  @Field((type) => MeOutputDataModel)
  data: MeOutputDataModel;
}
