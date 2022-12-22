import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCatgeoryDto } from "./dto/create-product.dto";
import { product } from "./etity/product.entity";

@Injectable()
export class ProductServices {
    constructor(
        @InjectRepository(product)
        private productRepository: Repository<product>,
    ) { }

    // CatgeoryCreate(Body: CreateCatgeoryDto): Promise<any> {
    //     // console.log(createCatgeoryDto);
        
    //     return this.productRepository.save(Body);
    // }

    CatgeoryCreate(createCatgeoryDto: CreateCatgeoryDto) {

        // console.log();
        
        return this.productRepository.save(createCatgeoryDto);
    }
}