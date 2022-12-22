import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get, Query } from '@nestjs/common';
import { from } from 'rxjs';

@Controller('email')
export class EmailController {
    constructor(private mailService:MailerService){}

    @Get('plain-text-email')
    async plainTextEmail(@Query('toemail') toemail){
        
        await this.mailService.sendMail({
            to: toemail,
            from: 'sakarvadiyap@gmail.com',
            subject: 'Your OTP',
            text: 'Walcome to Gghanshyam Digital'
        });
        return 'success'
    }
}

// http://localhost:3000/email/plain-text-email?toemail=poojan.patel@ghanshyamdigital.com