import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { type } from "os";

export class CreateCatgeoryDto {
    @IsString()
    catgeory:string
}