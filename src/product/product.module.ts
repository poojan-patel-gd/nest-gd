import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './etity/product.entity';
import { ProductController } from './product.controller';
import { ProductServices } from './product.service';

@Module({
    controllers: [ProductController],
    providers: [ProductServices,product],
    exports: [ProductServices],
    imports: [TypeOrmModule.forFeature([product])],
  })
export class ProductModule {}
