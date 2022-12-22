import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/auth.jwt.strategy';
import { user } from './etity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([user])],
})
export class UserModule {}
