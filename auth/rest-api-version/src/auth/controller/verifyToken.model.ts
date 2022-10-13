import { IsNotEmpty, IsString } from "class-validator";

export class VerifyTokenModel
{
    @IsNotEmpty()
    @IsString()
    access_token:string
}