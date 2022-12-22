import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm"
import { AppController } from "./app.controller";
import { user } from "./user/etity/user.entity";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { MulterModule } from "@nestjs/platform-express";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailController } from './email/email.controller';
import { ProductController } from './product/product.controller';
import { ProductServices } from "./product/product.service";
import { product } from "./product/etity/product.entity";
import { ProductModule } from './product/product.module';
import { JwtStrategy } from "./auth/auth.jwt.strategy";


@Module({
  controllers: [AppController, EmailController],
  imports: [
    UserModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Admin@123',
      database: 'nestjs',
      entities: [user,product],
      synchronize: true,
      // logging:true,
    }),
    AuthModule,
    ProfileModule,
    MulterModule.register({
      dest: 'uploadFiles'
    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "sakarvadiyap@gmail.com",
          pass: "usudwgpyyngixyvs",
        },
      }
    }),
  ],
})
export class AppModule { }