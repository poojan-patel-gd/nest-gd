import { Body, Controller, Post } from '@nestjs/common';
import { CreateCatgeoryDto } from './dto/create-product.dto';
import { ProductServices } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductServices) { }

    @Post()
    CatgeoryCreate(@Body() createCatgeoryDto: CreateCatgeoryDto) {
        return this.productService.CatgeoryCreate(createCatgeoryDto);
    }
}
