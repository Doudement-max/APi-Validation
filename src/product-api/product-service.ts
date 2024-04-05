import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable() 
export class ProductService {
    private readonly product = [];

    create(createProductDto: CreateProductDto){
        this.product.push(CreateProductDto);
    }
    findAll(){
        return this.product;
    }
     findOne(id: number) {
        return this.product.find(item => item.id === id);
     }
}