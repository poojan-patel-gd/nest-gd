import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;

    brcypt:string
}