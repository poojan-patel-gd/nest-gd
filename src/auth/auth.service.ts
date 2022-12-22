import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { async } from 'rxjs';
import { user } from 'src/user/etity/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = { user, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}