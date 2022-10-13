import { IsString } from 'class-validator';

export class UserGetAllModel {
  @IsString()
  pageNumber: string = "1";
  @IsString()
  pageSize: string = "10";
}
