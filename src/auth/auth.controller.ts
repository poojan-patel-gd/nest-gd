import { Controller, Post, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    
    @UseGuards(AuthGuard('local'))
    
    @Post('/login')
    async login(@Request() req:any) {        
        return this.authService.login(req.user);
    }
}
