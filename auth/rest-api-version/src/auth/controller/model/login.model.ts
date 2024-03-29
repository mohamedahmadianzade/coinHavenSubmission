import { IsNotEmpty, IsString } from "class-validator";

export class LoginModel
{
    @IsNotEmpty()
    @IsString()
    username:string;
    @IsNotEmpty()
    @IsString()
    password:string
}