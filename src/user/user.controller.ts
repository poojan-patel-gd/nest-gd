import { Controller, Get, Post, Req, Param, Delete, Patch } from "@nestjs/common";
import { Body, Put, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common/decorators";
import { UseGuards } from '@nestjs/common';
import { ParseIntPipe } from "@nestjs/common/pipes";
import { AuthGuard } from "@nestjs/passport";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express/multer/interceptors";
import { Request } from "express";
import { diskStorage } from "multer";
import path from "path";
import { emit } from "process";
import { parentPort } from "worker_threads";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    // dependency injection example 1
    constructor(private userService: UserService) { }

    // example 2
    // private userService;
    // constructor(userService: UserService){
    //     this.userService = userService;
    // }

    // example 3
    // private userService;
    // constructor(){
    //     this.userService = new UserService();
    // }


    @Get()
    @UseGuards(AuthGuard('jwt'))
    getuser() {
        return this.userService.get();
    }

    @Post()
    UserCreate(@Body() createUserDto: CreateUserDto) {
        return this.userService.UserCreate(createUserDto);
    }

    @Patch(':userId')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Body() updateUserDto: UpdateUserDto,
        @Param('userId', ParseIntPipe) userId: number
    ) {
        return this.userService.upadte(updateUserDto, userId);
    }

    @Get('/:userId')
    @UseGuards(AuthGuard('jwt'))
    getUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.getUser(userId);
    }

    @Post('one/:userId')
    @UseGuards(AuthGuard('jwt'))
    oneToMany(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.oneToMany(userId);
    }

    @Delete('/:userId')
    @UseGuards(AuthGuard('jwt'))
    deleteUser(@Param('userId', ParseIntPipe) userId: number) {
        return this.userService.delete(userId);
    }

    @Post('getemail')
    @UseGuards(AuthGuard('jwt'))
    sendemail(@Body('email') email: string) {
        return this.userService.sendemail(email)
    }

    // silgle file uploade
    @Put('upload')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: 'src/uploadFiles',
            filename: (req, file, cb) => {
                const filenameSplit = file.originalname.split(".");
                const fileExt = filenameSplit[filenameSplit.length - 1];
                cb(null, `${Date.now()}.${fileExt}`);
            }
        })
    }))

    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", file);
        return {
            message: 'i m file'
        }
    }

    // multipal file uploade
    // @Post('upload')
    // @UseInterceptors(FileFieldsInterceptor([
    //     {
    //         name: 'profile',maxCount: 2
    //     },
    //     {
    //         name: 'profile2', maxCount: 1
    //     }
    // ]))
    // uploadFile(@UploadedFiles() profile: {profile: Express.Multer.File[],profile2: Express.Multer.File[]}):object {
    //     console.log('profile++++++++++',profile);               
    //     return {
    //         message: 'i m file'
    //     }
    // }
}
