import { PartialType } from "@nestjs/mapped-types";
import { loginAuthDto } from "./login-auth.dto"; 
import { IsNotEmpty } from "class-validator";

export class RegisterAuthDto extends PartialType(loginAuthDto) {
    @IsNotEmpty()
    name!: string;
}