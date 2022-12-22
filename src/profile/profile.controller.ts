import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
    @Get()
    profil(){
        return {message:'i am Protected route'};
    }
}
