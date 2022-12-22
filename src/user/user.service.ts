import { Get, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { enCodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from './etity/user.entity';
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express/multer/interceptors";
import { diskStorage } from "multer";
import { Body, Post, Req, UploadedFile, UploadedFiles } from "@nestjs/common/decorators";
import { jwtConstants } from 'src/auth/auth.constants';
import { JoinAttribute } from 'typeorm/query-builder/JoinAttribute';
import { title } from 'process';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(user)
        private userRepository: Repository<user>,
    ) { }

    get(): Promise<user[]> {
        // return { name: 'poojan patel', email: 'sakarvadiyap@gmail.com' };
        return this.userRepository.find();
    }

    UserCreate(createUserDto: CreateUserDto) {
        const bcrypt = enCodePassword(createUserDto.password);

        return this.userRepository.save({ ...createUserDto, bcrypt });
    }


    upadte(
        updateUserDto: UpdateUserDto, id: number) {
        const bcrypt = enCodePassword(updateUserDto.password);

        return this.userRepository.update(id, { ...updateUserDto, bcrypt });
    }

    getUser(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }

    findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    delete(id: number) {
        return this.userRepository.delete(id);
    }
    async sendemail(email: string) {
        const userdata = await this.userRepository.findOne({ where: { email } });
        if (!userdata) {
            return { message: "User Not Exists" };
        }
        else {
            const link = `http://localhost:3000/email/plain-text-email?toemail=${userdata.email}`

            console.log('link->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', link);

            return 'please check your email';
        }
    }
    async oneToMany(id: number) {
        let data = await this.userRepository.find({
            where: { id },
            select: [
                'name', 'email',
                // include: [{
                //     model: Post,
                //     as: 'book detail',
                //     attributes: ['title']
                // }],
            ]
        });

        return data
    }

}
