import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";



export class LoginAdminDto{
    @ApiProperty({
        example: 'email@mail.uz',
        description: 'Foydalanuvchi elektron pochtasi'
    })
    @IsEmail()
    user_name: string;

    @ApiProperty({
        example: 'email@mail.P@$$ww00rd',
        description: 'Foydalanuvchi paroli'
    })
    @IsNotEmpty()
    @IsString()
    password: string;


}