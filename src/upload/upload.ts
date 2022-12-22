import { Injectable } from '@nestjs/common';
import { request, response, NextFunction } from 'express';

@Injectable()
export class UploadeFile {
    use(req:Request, res:Response, next:NextFunction){
        console.log('i m from uplod folder');
        next();
    }
}